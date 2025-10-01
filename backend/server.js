require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CafeConnect Backend API' });
});

// Cafe Schema
const cafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  nearbyColleges: [{ type: String }],
  rating: { type: Number, default: 4.0 },
  image: String,
  phone: String,
  openHours: String
});

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: String,
  cafeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cafe' }
});

const Cafe = mongoose.model('Cafe', cafeSchema);
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// API Routes
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find().populate('cafeId');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cafe Routes
app.get('/api/cafes', async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.json(cafes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/cafes/search/:college', async (req, res) => {
  try {
    const college = req.params.college;
    const cafes = await Cafe.find({
      nearbyColleges: { $regex: college, $options: 'i' }
    });
    res.json(cafes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/cafes', async (req, res) => {
  try {
    const cafe = new Cafe(req.body);
    await cafe.save();
    res.status(201).json(cafe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});