import React, { useEffect, useState } from 'react';
import { socket, api } from '../api';
import ItemForm from './ItemForm';
import "./ItemList.css";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/items');
        setItems(response.data);
      } catch (err) {
        console.error('Erro ao buscar itens:', err);
      }
    };
    fetchItems();

    socket.on('itemAdded', item => {
      setItems(prevItems => [...prevItems, item]);
    });

    socket.on('itemUpdated', updatedItem => {
      setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    });

    socket.on('itemDeleted', id => {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    });

    return () => {
      socket.off('itemAdded');
      socket.off('itemUpdated');
      socket.off('itemDeleted');
    };
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      console.log(`Item com ID ${id} excluído.`);
    } catch (err) {
      console.error('Erro ao excluir item:', err);
    }
  };

  return (
    <div className="item-list">
      {editingItem && (
        <ItemForm item={editingItem} setEditingItem={setEditingItem} />
      )}
      {items.map(item => (
        <div className="item-card" key={item.id}>
          <img src={`data:image/png;base64,${item.image}`} alt={item.name} className="item-image" />
          <div className="item-info">
            <h3 className="item-name">{item.name}</h3>
            <p className="item-quantity">Quantidade: {item.quantity}</p>
            <p className="item-supplier">Fornecedor: {item.supplier}</p>
            <p className="item-price">Preço: {item.price}</p>
          </div>
          <div className="item-actions">
            <button className="action-button edit-button" onClick={() => handleEdit(item)}>Editar</button>
            <button className="action-button delete-button" onClick={() => handleDelete(item.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
