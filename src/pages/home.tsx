import { motion } from 'framer-motion';
import Navbar from "../components/navbar";
import bg from "../assets/bg.png";
import Login from "../components/loginmodel";
import ContactModal from "../components/contactmodel";
import { useState, useEffect } from "react";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background with Parallax Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${bg})`,
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cafe-50/90 via-cream-100/80 to-cafe-100/90" />
      
      {/* Floating Coffee Beans */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-cafe-600 rounded-full opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onContactClick={() => setShowContact(true)}
      />

      <motion.div
        className="relative z-10 pt-32 min-h-screen flex flex-col items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {/* Hero Content with 3D Card Effect */}
          <motion.div 
            className="card-3d glass p-8 md:p-12 rounded-3xl shadow-3d backdrop-blur-lg border border-white/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-playfair font-bold mb-6"
              variants={itemVariants}
            >
              Welcome to{" "}
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                CafeConnect
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-cafe-700 mb-8 font-medium leading-relaxed"
              variants={itemVariants}
            >
              Connecting you with your favorite café treats,{" "}
              <br className="hidden md:block" />
              one delicious order at a time.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setShowLogin(true)}
                className="btn-3d bg-coffee-gradient text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-3d hover:shadow-3d-hover smooth-transition relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cafe-600 to-cafe-500"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.a
                href="/search"
                className="btn-3d bg-gradient-to-r from-cafe-500 to-cafe-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-3d hover:shadow-3d-hover smooth-transition relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Find Cafes Near College</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cafe-600 to-cafe-700"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-10 left-10 w-20 h-20 bg-cafe-200 rounded-full opacity-30 float"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-16 h-16 bg-cream-300 rounded-full opacity-40 float"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Enhanced Modals */}
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

export default Home;
