import { motion } from 'framer-motion';
import logo from "../assets/logo.png";

type NavbarProps = {
  onLoginClick: () => void;
  onContactClick: () => void;
};

const Navbar = ({ onLoginClick, onContactClick }: NavbarProps) => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex justify-between items-center px-6 py-3 glass shadow-cafe fixed top-0 z-50 border-b border-cafe-200/20"
    >
      <motion.div 
        className="flex items-center gap-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.img
          src={logo}
          alt="CafeConnect Logo"
          className="w-14 h-12 object-cover rounded-full shadow-cafe card-3d"
          whileHover={{ rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <h1 className="text-2xl font-playfair font-bold gradient-text hover:scale-105 smooth-transition cursor-pointer">
          CafeConnect
        </h1>
      </motion.div>

      <div className="flex items-center space-x-4">
        <motion.a
          href="/"
          className="text-cafe-700 hover:text-cafe-900 font-medium smooth-transition relative overflow-hidden px-3 py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Home</span>
          <motion.div
            className="absolute inset-0 bg-cafe-100 rounded-lg"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
        
        <motion.a
          href="/search"
          className="text-cafe-700 hover:text-cafe-900 font-medium smooth-transition relative overflow-hidden px-3 py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Find Cafes</span>
          <motion.div
            className="absolute inset-0 bg-cafe-100 rounded-lg"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
        
        <motion.a
          href="/menu"
          className="text-cafe-700 hover:text-cafe-900 font-medium smooth-transition relative overflow-hidden px-3 py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Menu</span>
          <motion.div
            className="absolute inset-0 bg-cafe-100 rounded-lg"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
        
        <motion.button
          onClick={onContactClick}
          className="text-cafe-700 hover:text-cafe-900 font-medium smooth-transition relative overflow-hidden px-3 py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Contact</span>
          <motion.div
            className="absolute inset-0 bg-cafe-100 rounded-lg"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
        
        <motion.button
          onClick={onLoginClick}
          className="btn-3d bg-coffee-gradient text-white px-6 py-2 rounded-lg font-medium shadow-cafe hover:shadow-3d-hover smooth-transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
