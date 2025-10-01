import { useEffect, useState, useRef, memo, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaShoppingCart } from 'react-icons/fa';
import burgerImg from '../assets/burger.png';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import burgerImg1 from '../assets/front-view-tasty-meat-burger-with-cheese-and-salad-free-photo.jpg';
import HeroSection from '../components/HeroSection';

gsap.registerPlugin(ScrollTrigger);
import friesImg from '../assets/941f50-splendid-table-french-fries.jpg';
import grilledImg from '../assets/grilled-club-sandwich-533668.jpg';
import pizzaImg from '../assets/pav-bhaji.jpg';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../pages/cartcontext';
import strawberryImg from '../assets/thick-strawberry-shake5-980x980.jpg';
import coffeeImg from '../assets/RFO-1400x919-IcedCoffee-76221116-2565-4103-9899-89571028018e-0-1400x919.jpg';
import vegHakkaNoodles from '../assets/hakkanoodles2.webp';
import thickChocolate from '../assets/thick_hot_chocolate_5.jpg';
import pavBhaji from '../assets/pav-bhaji.jpg';
import samosa from '../assets/samosa.jpeg';
import vegSandwich from '../assets/vegsandwich.jpeg';
import choleBhature from '../assets/chhole  bhature.jpeg';
import specialThali from '../assets/specialthali.webp';
import masalaDosa from '../assets/masaladosha.jpeg';
import chowmein from '../assets/chicken-chow-mein-recipe.jpg';
import idliSambhar from '../assets/idli sambhar.jpeg';
import shevpaav from "../assets/Shev-Pav.jpg"

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const imageMap: { [key: string]: string } = {
  'Thick Strawberry': strawberryImg,
  'Grilled Sandwich': grilledImg,
  'Burger': burgerImg1,
  'Cold Coffee': coffeeImg,
  'French Fries':friesImg ,
  'Shev Paav':shevpaav,
  'Veg Hakka Noodles':vegHakkaNoodles,
  'Thick Chocolate':thickChocolate,
  'Pav Bhaji':pavBhaji,
  'Samosa':samosa,
  'Veg Sandwich':vegSandwich,
  'Chole Bhature': choleBhature,
  'Special Thali':specialThali,
  'Masala Dosa':masalaDosa,
  'Chowmein':chowmein,
  'Idli Sambhar':idliSambhar,
};

const fallbackImage = pizzaImg;

const OptimizedCard = memo(({ item, index, imageMap, fallbackImage, getQuantity, handleAdd1, handleRemove1 }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Simplified scroll animation
    gsap.fromTo(card, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group transform-gpu will-change-transform"
      whileHover={{ 
        scale: 1.03,
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="menu-card relative bg-gradient-to-br from-white via-cafe-50 to-cream-100 rounded-2xl p-6 shadow-lg border border-cafe-200/30 overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        {/* Optimized background image */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <img
            src={imageMap[item.name] || fallbackImage}
            alt={item.name}
            className={`lazy-image w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
            decoding="async"
          />
        </div>
        
        {/* Simplified hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-cafe-400/10 to-cream-300/10 rounded-2xl transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        <div className="relative z-10 space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-playfair font-bold text-cafe-800 mb-2">
              {item.name}
            </h3>
            <div className="w-12 h-0.5 bg-cafe-500 mx-auto rounded-full" />
          </div>
          
          <p className="text-cafe-700 text-sm leading-relaxed text-center px-2">
            {item.description}
          </p>
          
          <div className="text-center py-3">
            <div className="inline-block bg-cafe-100 px-4 py-2 rounded-xl">
              <span className="text-sm font-medium text-cafe-700">Just At </span>
              <span className="text-xl font-bold text-cafe-800">
                ₹{item.price}
              </span>
            </div>
          </div>
          
          <div className="flex justify-center">
            {getQuantity(item.id) > 0 ? (
              <div className="flex items-center space-x-3 bg-cafe-100 border border-cafe-300 px-4 py-2 rounded-xl">
                <button
                  onClick={() => handleRemove1(item.id)}
                  className="w-8 h-8 bg-cafe-500 text-white font-bold rounded-full hover:bg-cafe-600 transition-colors duration-200"
                >
                  −
                </button>
                <span className="text-lg font-bold text-cafe-800 min-w-[1.5rem] text-center">
                  {getQuantity(item.id)}
                </span>
                <button
                  onClick={() => handleAdd1(item.id)}
                  className="w-8 h-8 bg-cafe-500 text-white font-bold rounded-full hover:bg-cafe-600 transition-colors duration-200"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="bg-cafe-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cafe-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                onClick={() => handleAdd1(item.id)}
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'MenuItems'));
       
        const fetchedItems: MenuItem[] = snapshot.docs.map(doc => {
          console.log(doc.data());
          return {
            id: doc.id,
            ...doc.data(),
          } as MenuItem;
        });

        setItems(fetchedItems);
      } catch (err) {
        console.error('Error fetching menu:', err);
      }
    };
    fetchMenu();
  }, []);

  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({});
  const { cartItems, addItem, removeItem } = useCart();

  const handleAdd1 = useCallback((id: string) => {
    addItem(id);
    setItemQuantities(prev => ({
     ...prev,
     [id]: (prev[id] || 0) + 1
   }));
  }, [addItem]);

  const handleRemove1 = useCallback((id: string) => {
    removeItem(id);
     setItemQuantities(prev => {
     const newQty = (prev[id] || 0) - 1;
     const updated = { ...prev };
     if (newQty <= 0) delete updated[id];
     else updated[id] = newQty;
     return updated;
   });
  }, [removeItem]);

  const getQuantity = useCallback((id: string) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  }, [cartItems]);

  useEffect(() => {
    const totalCount = Object.values(itemQuantities).reduce((sum, qty) => sum + qty, 0);
    setCartCount(totalCount);
  }, [itemQuantities]);

  const renderSection = (category: string, sectionId: string) => {
    const filteredItems = items.filter(item => item.category === category);
    
    if (filteredItems.length === 0) return null;

    return (
      <motion.section  
        className="scroll-mt-20 px-4 mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="glass rounded-2xl p-6 mt-4 shadow-cafe mb-8 border border-cafe-200/20"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 id={sectionId} className="scroll-mt-20 text-4xl font-playfair font-bold text-center">
            <span className="text-cafe-800">{category}</span>
            <span className="gradient-text"> Menu</span> 
          </h2>
        </motion.div>
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500">No items available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {filteredItems.map((item, index) => (
              <OptimizedCard key={item.id} item={item} index={index} imageMap={imageMap} fallbackImage={fallbackImage} getQuantity={getQuantity} handleAdd1={handleAdd1} handleRemove1={handleRemove1} />
            ))}
          </div>
        )}
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-50 to-cream-100 font-poppins text-cafe-900 scroll-smooth">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="glass flex justify-between items-center px-8 py-4 shadow-cafe sticky top-0 z-50 border-b border-cafe-200/20"
      >
        <motion.h1 
          className="text-2xl font-playfair font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          Welcome To CafeConnect
        </motion.h1>
        <ul className="flex space-x-8 text-cafe-700 font-medium items-center">
          {['FNF', 'Snack Corner', 'Cafeteria', 'Canteen'].map((item, index) => (
            <motion.li key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a 
                href={`#${item.toLowerCase().replace(' ', '')}`} 
                className="hover:text-cafe-900 smooth-transition relative group px-3 py-2 rounded-lg"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-gradient group-hover:w-full smooth-transition"></span>
              </a>
            </motion.li>
          ))}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaShoppingCart 
              className="hover:text-cafe-900 cursor-pointer text-2xl text-cafe-700 smooth-transition" 
              onClick={() => navigate('/cart')} 
            />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-coffee-gradient text-white rounded-full text-xs px-2 py-0.5 shadow-cafe"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.div>
        </ul>
      </motion.nav>

      <HeroSection />

      {renderSection('FNF Special', 'fnf')}
      {renderSection('Snacks Corner', 'snack')}
      {renderSection('Cafeteria', 'cafeteria')}
      {renderSection('Canteen', 'canteen')}

      {cartCount > 0 && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.button
            onClick={() => navigate('/cart')}
            className="btn-3d bg-coffee-gradient text-white px-6 py-4 rounded-2xl shadow-3d hover:shadow-3d-hover font-semibold text-lg flex items-center space-x-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaShoppingCart className="text-xl" />
            <span>Cart ({cartCount})</span>
          </motion.button>
        </motion.div>
      )}

      <motion.footer 
        className="mt-8 bg-cream-gradient py-12 border-t border-cafe-200/30 shadow-inner"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-cafe-700 space-y-6 md:space-y-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-3xl font-playfair font-bold gradient-text">CafeConnect</h3>
            <p className="text-sm mt-2 font-medium">© {new Date().getFullYear()} All rights reserved.</p>
          </motion.div>

          <div className="flex space-x-8 text-sm font-medium">
            {['FNF Special', 'Snack Corner', 'Cafeteria', 'Canteen'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`} 
                className="hover:text-cafe-900 smooth-transition relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-gradient group-hover:w-full smooth-transition"></span>
              </motion.a>
            ))}
          </div>

          <div className="flex space-x-4 text-2xl text-cafe-600">
            {['facebook', 'instagram', 'twitter'].map((social) => (
              <motion.a 
                key={social}
                href="#" 
                className="hover:text-cafe-900 smooth-transition"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={`fab fa-${social}`}></i>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div 
          className="mt-6 text-center text-sm text-cafe-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Made with <motion.span 
            className="text-red-500 inline-block"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >❤️</motion.span> by Muskan 
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default Menu;