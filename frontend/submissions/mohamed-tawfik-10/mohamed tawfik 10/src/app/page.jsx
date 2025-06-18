"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./components/ItemList";
import CrudForm from "./components/CrudForm";

const API_URL = "https://683f66205b39a8039a548708.mockapi.io/EduLite/api/CRUD";

function App() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSave = (data) => {
    if (data.id) {
      // Update
      axios.put(`${API_URL}/${data.id}`, data)
        .then((res) => {
          setItems((prev) =>
            prev.map((item) => (item.id === data.id ? res.data : item))
          );
          setEditItem(null);
        });
    } else {
      // Add
      axios.post(API_URL, data)
        .then((res) => {
          setItems((prev) => [...prev, res.data]);
          setEditItem(null);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setItems((prev) => prev.filter((item) => item.id !== id)));
  };

  return (
    <div className="min-h-screen bg-gray-300 text-center relative">
      <h1 className="text-2xl text-black font-bold py-4">Books Store System</h1>

      <ItemList items={items} setEditing={setEditItem} deleteItem={handleDelete} />

      {editItem !== null && (
        <CrudForm editItem={editItem} onSave={handleSave} onDone={() => setEditItem(null)} />
      )}

      <button
        onClick={() => {
          console.log("Opening modal...");
          setEditItem({});
        }}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 text-2xl shadow-lg"
      >
        +
      </button>

      <footer className="mt-6 text-sm text-gray-700">
        By Mohamed Tawfik, All Rights Reserved © 2025
      </footer>
    </div>
  );
}

export default App;
