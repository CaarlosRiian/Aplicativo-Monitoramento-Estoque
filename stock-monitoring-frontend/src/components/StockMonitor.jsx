import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockMonitor = () => {
  const [stock, setStock] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/items/');
      setStock(response.data);
    } catch (error) {
      console.error('Erro ao buscar o estoque:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/items/', newItem);
      setStock([...stock, response.data]);
      setNewItem({ name: '', quantity: 0 });
    } catch (error) {
      console.error('Erro ao adicionar o item:', error);
    }
  };

  const handleUpdateItem = async (id, updatedItem) => {
    try {
      await axios.put(`http://localhost:8000/api/items/${id}/`, updatedItem);
      fetchStock();
    } catch (error) {
      console.error('Erro ao atualizar o item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/items/${id}/`);
      fetchStock();
    } catch (error) {
      console.error('Erro ao deletar o item:', error);
    }
  };

  return (
    <div>
      <h1>Monitoramento de Estoque</h1>
      <ul>
        {stock.map((item) => (
          <li key={item.id}>
            {item.name}: {item.quantity}
            <button onClick={() => handleUpdateItem(item.id, { ...item, quantity: item.quantity + 1 })}>
              Aumentar
            </button>
            <button onClick={() => handleUpdateItem(item.id, { ...item, quantity: item.quantity - 1 })}>
              Diminuir
            </button>
            <button onClick={() => handleDeleteItem(item.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Adicionar Novo Item</h2>
        <input
          type="text"
          placeholder="Nome"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
        />
        <button onClick={handleAddItem}>Adicionar</button>
      </div>
    </div>
  );
};

export default StockMonitor;