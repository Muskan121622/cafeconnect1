const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

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

const Cafe = mongoose.model('Cafe', cafeSchema);

// Sample cafe data
const sampleCafes = [
  {
    name: "Campus Brew",
    address: "123 University Ave, Boston, MA",
    location: { lat: 42.3601, lng: -71.0589 },
    nearbyColleges: ["Harvard University", "MIT", "Boston University"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    phone: "(617) 555-0123",
    openHours: "6:00 AM - 10:00 PM"
  },
  {
    name: "Study Spot Cafe",
    address: "456 College St, Boston, MA",
    location: { lat: 42.3505, lng: -71.1054 },
    nearbyColleges: ["Harvard University", "Boston College"],
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400",
    phone: "(617) 555-0124",
    openHours: "7:00 AM - 9:00 PM"
  },
  {
    name: "Tech Cafe",
    address: "789 Innovation Dr, Cambridge, MA",
    location: { lat: 42.3736, lng: -71.1097 },
    nearbyColleges: ["MIT", "Harvard University"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400",
    phone: "(617) 555-0125",
    openHours: "6:30 AM - 11:00 PM"
  },
  {
    name: "Green Bean Coffee",
    address: "321 Stanford Ave, Palo Alto, CA",
    location: { lat: 37.4419, lng: -122.1430 },
    nearbyColleges: ["Stanford University", "Santa Clara University"],
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400",
    phone: "(650) 555-0126",
    openHours: "6:00 AM - 10:00 PM"
  },
  {
    name: "Westwood Grind",
    address: "654 Westwood Blvd, Los Angeles, CA",
    location: { lat: 34.0522, lng: -118.2437 },
    nearbyColleges: ["UCLA", "USC"],
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400",
    phone: "(310) 555-0127",
    openHours: "7:00 AM - 9:00 PM"
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    await Cafe.deleteMany({});
    console.log('Cleared existing cafe data');

    // Insert sample data
    await Cafe.insertMany(sampleCafes);
    console.log('Sample cafes inserted successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
}

seedDatabase();