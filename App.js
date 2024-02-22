import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddData = async () => {
    try {
      await axios.post('/api/data', { text: input });
      fetchData();
      setInput('');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`/api/data/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleAddData}>Add</button>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.text}
            <button onClick={() => handleDeleteData(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
