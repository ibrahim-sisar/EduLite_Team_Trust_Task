'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CrudContext = createContext();
const API = 'https://683f66205b39a8039a548708.mockapi.io/EduLite/api/CRUD';

export const CrudProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get(API);
    setItems(res.data);
  };

  const createItem = async (data) => {
    const res = await axios.post(API, data);
    setItems(prev => [...prev, res.data]);
  };

  const updateItem = async (id, data) => {
    const res = await axios.put(`${API}/${id}`, data);
    setItems(prev => prev.map(item => item.id === id ? res.data : item));
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API}/${id}`);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <CrudContext.Provider value={{
      items,
      createItem,
      updateItem,
      deleteItem
    }}>
      {children}
    </CrudContext.Provider>
  );
};

export const useCrud = () => useContext(CrudContext);
