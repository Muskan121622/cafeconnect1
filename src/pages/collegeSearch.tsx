import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import CollegeSearch from '../components/CollegeSearch';
import { useState } from 'react';
import Login from '../components/loginmodel';
import ContactModal from '../components/contactmodel';

const CollegeSearchPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cafe-50">
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onContactClick={() => setShowContact(true)}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-24 pb-12"
      >
        <CollegeSearch />
      </motion.div>

      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Login onClose={() => setShowLogin(false)} />
        </motion.div>
      )}
      
      {showContact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ContactModal onClose={() => setShowContact(false)} />
        </motion.div>
      )}
    </div>
  );
};

export default CollegeSearchPage;