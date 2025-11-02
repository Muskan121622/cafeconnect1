import React, { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Cafe {
  _id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  nearbyColleges: string[];
  rating: number;
  image?: string;
  phone?: string;
  openHours?: string;
}

const CollegeSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 42.3601, lng: -71.0589 });

  const searchCafes = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`https://cafeconnect1-6.onrender.com/api/cafes/search/${searchTerm}`);
      setCafes(response.data);
      
      if (response.data.length > 0) {
        setMapCenter({
          lat: response.data[0].location.lat,
          lng: response.data[0].location.lng
        });
      }
    } catch (error) {
      console.error('Error searching cafes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchCafes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Cafes Near Your College
          </h1>
          <p className="text-lg text-gray-600">
            Discover the best cafes and study spots around your campus
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your college name (e.g., Harvard University, MIT, UCLA)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              onClick={searchCafes}
              disabled={loading}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Results */}
        {cafes.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cafe List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Found {cafes.length} cafes near {searchTerm}
              </h2>
              {cafes.map((cafe) => (
                <motion.div
                  key={cafe._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedCafe?._id === cafe._id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setSelectedCafe(cafe)}
                >
                  <div className="flex items-start space-x-4">
                    {cafe.image && (
                      <img
                        src={cafe.image}
                        alt={cafe.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {cafe.name}
                      </h3>
                      <p className="text-gray-600 mb-2">{cafe.address}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>⭐ {cafe.rating}</span>
                        {cafe.phone && <span>📞 {cafe.phone}</span>}
                        {cafe.openHours && <span>🕒 {cafe.openHours}</span>}
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-orange-600 font-medium">
                          Near: {cafe.nearbyColleges.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <div className="lg:sticky lg:top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Map View</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '600px' }}>
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
                  <Map
                    defaultCenter={mapCenter}
                    center={mapCenter}
                    defaultZoom={13}
                    mapId="cafe-map"
                  >
                    {cafes.map((cafe) => (
                      <Marker
                        key={cafe._id}
                        position={cafe.location}
                        onClick={() => setSelectedCafe(cafe)}
                        title={cafe.name}
                      />
                    ))}
                  </Map>
                </APIProvider>
              </div>
              
              {/* Selected Cafe Info */}
              {selectedCafe && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-white rounded-lg shadow-md p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedCafe.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{selectedCafe.address}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>⭐ {selectedCafe.rating}</span>
                    {selectedCafe.phone && <span>📞 {selectedCafe.phone}</span>}
                  </div>
                  {selectedCafe.openHours && (
                    <p className="text-sm text-gray-500 mt-1">
                      🕒 {selectedCafe.openHours}
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && searchTerm && cafes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No cafes found
            </h3>
            <p className="text-gray-600">
              Try searching for a different college name or check your spelling.
            </p>
          </div>
        )}

        {/* Popular Colleges */}
        {!searchTerm && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Popular Colleges
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Harvard University', 'MIT', 'Stanford University', 'UCLA', 'Boston University', 'USC', 'Boston College', 'Santa Clara University'].map((college) => (
                <button
                  key={college}
                  onClick={() => {
                    setSearchTerm(college);
                    setTimeout(() => searchCafes(), 100);
                  }}
                  className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center text-gray-700 hover:text-orange-600"
                >
                  {college}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeSearch;