import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

let items = [];

app.post('/upload', upload.single('image'), (req, res) => {
  const { name, quantity, supplier, price } = req.body;
  const { filename } = req.file;

  const item = {
    id: items.length + 1,
    name,
    quantity,
    supplier,
    price,
    image: fs.readFileSync(req.file.path, 'base64'),
  };
  items.push(item);

  io.emit('itemAdded', item);
  res.status(201).json(item);
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.put('/items/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, quantity, supplier, price } = req.body;
  const { file } = req;

  let item = items.find(item => item.id === parseInt(id));
  if (item) {
    item.name = name || item.name;
    item.quantity = quantity || item.quantity;
    item.supplier = supplier || item.supplier;
    item.price = price || item.price;
    if (file) {
      item.image = fs.readFileSync(file.path, 'base64');
    }

    io.emit('itemUpdated', item);
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== parseInt(id));

  io.emit('itemDeleted', parseInt(id));
  res.status(204).send();
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
