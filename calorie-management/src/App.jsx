// App.jsx

import React, { useState, useEffect } from 'react';
import idb from './idb';

function App() {
  const [items, setItems] = useState([]);
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState('BREAKFAST');
  const [description, setDescription] = useState('');

  useEffect(() => {
    idb.getItems().then((items) => setItems(items));
  }, []);

  const handleAddItem = () => {
    const item = { calories, category, description };
    idb.addItem(item).then(() => {
      setItems([...items, item]);
      setCalories('');
      setCategory('BREAKFAST');
      setDescription('');
    });
  };

  const handleDeleteItem = (id) => {
    idb.deleteItem(id).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Calorie Management Application</h1>
      <div className="mb-4">
        <label className="block mb-2">
          Calories:
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="block w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>
        <label className="block mb-2">
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <label className="block mb-2">
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>
        <button onClick={handleAddItem} className="bg-blue-500 text-white px-4 py-2 rounded">Add Item</button>
      </div>
      <h2 className="text-2xl font-bold mb-2">Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border-b border-gray-300 py-2">
            {item.description} ({item.calories} calories, {item.category})
            <button onClick={() => handleDeleteItem(item.id)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
