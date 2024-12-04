import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const MoodForm = ({ fetchMoods }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/moods', { imageUrl, caption });
    fetchMoods();
    setImageUrl('');
    setCaption('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button type="submit">Add on board</button>
    </form>
  );
};


const MoodBoard = ({ moods }) => {
  return (
    <div className="grid">
      {moods.map((mood, index) => (
        <div className="grid-item" key={index}>
          <img src={mood.imageUrl} alt={mood.caption} />
          <p>{mood.caption}</p>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [moods, setMoods] = useState([]);

  const fetchMoods = async () => {
    const response = await axios.get('http://localhost:5000/api/moods');
    setMoods(response.data);
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return (
    <div>
      <h1>Collaborative Mood Board</h1>
      <MoodForm fetchMoods={fetchMoods} />
      <MoodBoard moods={moods} />
    </div>
  );
};

export default App;
