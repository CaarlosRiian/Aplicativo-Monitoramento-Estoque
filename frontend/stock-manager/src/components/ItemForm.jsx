import React, { useState, useEffect } from 'react';
import { api } from '../api';
import "./ItemForm.css"

const ItemForm = ({ item, setEditingItem }) => {
  const [name, setName] = useState(item ? item.name : '');
  const [quantity, setQuantity] = useState(item ? item.quantity : '');
  const [image, setImage] = useState(null);
  const [supplier, setSupplier] = useState(item ? item.supplier : '');
  const [price, setPrice] = useState(item ? item.price : '');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setSupplier(item.supplier);
      setPrice(item.price);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('supplier', supplier);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (item) {
        await api.put(`/items/${item.id}`, formData);
      } else {
        await api.post('/upload', formData);
      }
      setEditingItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Quantidade" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <input type="text" placeholder="Fornecedor" value={supplier} onChange={(e) => setSupplier(e.target.value)} required />
      <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button className='button-edit-form' type="submit">{item ? 'Atualizar Item' : 'Adicionar Item'}</button>
      {item && 
      <button className='button-edit-cancel' type="button" onClick={() => setEditingItem(null)}>Cancelar</button>}
    </form>
  );
};

export default ItemForm;
