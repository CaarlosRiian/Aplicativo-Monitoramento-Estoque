import React, { useEffect, useState } from 'react';
import { fetchItems, addItem, updateItemQuantity, deleteItem } from '../api';

const StockManagement = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems();
      console.log('Fetched items:', data);
      
      // Verifique a estrutura dos dados
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error('Data fetched is not an array:', data);
      }
    };
    getItems();
  }, []);

  const handleAddItem = async () => {
    const addedItem = await addItem(newItem);
    if (addedItem) {
      setItems([...items, addedItem]);
      setNewItem({ name: '', quantity: 0 });
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    const updatedItem = await updateItemQuantity(id, quantity);
    if (updatedItem) {
      const updatedItems = items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      setItems(updatedItems);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar o item:', error);
    }
  };

  return (
    <div>
      <h1>Stock Management</h1>
      <div>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name ? item.name : 'Unnamed Item'} - {item.quantity ? item.quantity : '0'}
            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockManagement;