const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://admin1:admin@moodboardapp.x3red.mongodb.net/?retryWrites=true&w=majority&appName=Moodboardapp',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Schema & Model
const MoodSchema = new mongoose.Schema({
  imageUrl: String,
  caption: String,
});
const Mood = mongoose.model('Mood', MoodSchema);

// Routes
app.get('/api/moods', async (req, res) => {
  const moods = await Mood.find();
  res.json(moods);
});

app.post('/api/moods', async (req, res) => {
  const mood = new Mood(req.body);
  await mood.save();
  res.json(mood);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

