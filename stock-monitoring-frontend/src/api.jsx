import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/items/';

export const fetchItems = async () => {
  try {
      const response = await axios.get(API_URL);
      return response.data;
  } catch (error) {
      console.error('Error fetching items:', error);
      return [];
  }
};

export const addItem = async (item) => {
  try {
      const response = await axios.post(API_URL, item);
      return response.data;
  } catch (error) {
      console.error('Error adding item:', error);
  }
};

export const updateItemQuantity = async (id, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/items/${id}/update_quantity/`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating item quantity:', error);
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    console.log('Item deleted:', response.data);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};