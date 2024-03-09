// Table.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
    fetchCounts();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://backenddata-1.onrender.com/api/data');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching data');
    }
  };

  const fetchCounts = async () => {
    try {
      const response = await axios.get('https://backenddata-1.onrender.com/api/data/count');
      setAddCount(response.data.addCount);
      setUpdateCount(response.data.updateCount);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  const handleAddData = async () => {
    try {
      await axios.post('https://backenddata-1.onrender.com/api/data/add', { name, description });
      setName('');
      setDescription('');
      fetchData();
      fetchCounts();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete('https://backenddata-1.onrender.com/api/data/deleteAll');
      fetchData();
      fetchCounts();
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setDescription(item.description);
  };

  const handleUpdateData = async () => {
    try {
      await axios.put(`https://backenddata-1.onrender.com/api/data/update/${editingId}`, { name, description });
      fetchData();
      fetchCounts();
      setEditingId(null);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">MERN Table</h1>
      <div className="mb-4">
        <label className="block mb-1">Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="border border-gray-400 rounded-md py-2 px-4 w-64" />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description:</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="border border-gray-400 rounded-md py-2 px-4 w-64" />
      </div>
      <button onClick={handleAddData} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Add</button>
      <button onClick={handleClearAll} className="bg-red-500 text-white px-4 py-2 rounded-md">Clear All</button>
      <div>
        <h2 className="text-xl font-semibold mb-2">Data:</h2>
        <ul>
          {data.map(item => (
            <li key={item._id} className="border border-gray-400 rounded-md p-2 mb-2">
              {editingId === item._id ? (
                <div className="flex items-center justify-between">
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="border border-gray-400 rounded-md py-1 px-2" />
                  <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="border border-gray-400 rounded-md py-1 px-2" />
                  <button onClick={handleUpdateData} className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{item.name}</div>
                    <div className="text-gray-600">{item.description}</div>
                  </div>
                  <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Counts:</h2>
        <p className="text-gray-600">Add Count: {addCount}</p>
        <p className="text-gray-600">Update Count: {updateCount}</p>
      </div>
    </div>
  );
};

export default Table;
