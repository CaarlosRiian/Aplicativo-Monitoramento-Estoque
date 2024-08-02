import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");
const api = axios.create({
  baseURL: "http://localhost:4000",
});



export { socket, api };
