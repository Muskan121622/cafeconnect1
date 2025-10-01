import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import burgerImg from '../assets/burger.png';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const button = buttonRef.current;
    const title = titleRef.current;
    const particles = particlesRef.current;

    if (!hero || !text || !image || !button || !title || !particles) return;

    // Revolutionary entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(hero, 
      { scale: 0.7, opacity: 0, rotationX: -30, z: -200 },
      { scale: 1, opacity: 1, rotationX: 0, z: 0, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(text.children, 
      { y: 150, opacity: 0, rotationX: -20, scale: 0.8 },
      { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 1, stagger: 0.3, ease: "power4.out" },
      "-=0.8"
    )
    .fromTo(image, 
      { x: 300, opacity: 0, rotationY: 60, scale: 0.3, z: -100 },
      { x: 0, opacity: 1, rotationY: 0, scale: 1, z: 0, duration: 1.5, ease: "power4.out" },
      "-=1.2"
    )
    .fromTo(button, 
      { scale: 0, rotationZ: 360, y: 50 },
      { scale: 1, rotationZ: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      "-=0.5"
    )
    .fromTo(particles.children,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=1"
    );

    // Advanced floating animation for burger
    gsap.to(image, {
      y: -25,
      rotationZ: 2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    gsap.to(image, {
      rotationY: 5,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Revolutionary 3D hover effect for image
    const handleImageHover = () => {
      gsap.to(image, {
        rotationY: 20,
        rotationX: 10,
        scale: 1.15,
        z: 50,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    const handleImageLeave = () => {
      gsap.to(image, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        z: 0,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    // Dynamic mouse tracking for 3D effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      gsap.to(hero, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(hero, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    image.addEventListener('mouseenter', handleImageHover);
    image.addEventListener('mouseleave', handleImageLeave);
    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    // Animate particles
    gsap.to(particles.children, {
      y: "random(-20, 20)",
      x: "random(-15, 15)",
      rotation: "random(-180, 180)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        each: 0.2,
        from: "random"
      }
    });

    return () => {
      image.removeEventListener('mouseenter', handleImageHover);
      image.removeEventListener('mouseleave', handleImageLeave);
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToMenu = () => {
    const element = document.getElementById('fnf');
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 100 },
        ease: "power3.inOut"
      });
    }
  };

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col md:flex-row items-center justify-between px-8 py-20 mt-6 mx-4 rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fefcf9 0%, #f9e6d0 50%, #edc9a3 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Revolutionary Animated Background Elements */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-40 ${
              i % 3 === 0 ? 'w-3 h-3 bg-cafe-400' : 
              i % 3 === 1 ? 'w-2 h-2 bg-cream-500' : 
              'w-1 h-1 bg-cafe-300'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 10px currentColor'
            }}
          />
        ))}
        
        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`geo-${i}`}
            className={`absolute opacity-20 ${
              i % 2 === 0 ? 'w-4 h-4 bg-cafe-200 rotate-45' : 'w-3 h-3 bg-cream-300 rounded-full'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + i * 0.7}s ease-in-out infinite ${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div ref={textRef} className="max-w-2xl text-left space-y-8 z-10">
        <h2 ref={titleRef} className="text-5xl md:text-7xl font-playfair font-bold text-cafe-900 leading-tight">
          Choose From Variety Of{" "}
          <span 
            className="bg-gradient-to-r from-cafe-600 via-cafe-500 to-cafe-700 bg-clip-text text-transparent relative"
            style={{ 
              backgroundSize: '300% 300%',
              animation: 'gradientShift 4s ease-in-out infinite'
            }}
          >
            Canteens
            <div className="absolute inset-0 bg-gradient-to-r from-cafe-400 to-cafe-600 opacity-20 blur-sm -z-10 animate-pulse" />
          </span>
        </h2>
        
        <p className="text-xl text-cafe-700 leading-relaxed font-medium">
          Experience the future of campus dining. Order delicious meals from your favorite canteens 
          with revolutionary 3D interactions and seamless delivery right to your classroom.
        </p>
        
        <button
          ref={buttonRef}
          onClick={scrollToMenu}
          className="group relative bg-gradient-to-r from-cafe-500 via-cafe-600 to-cafe-700 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="relative z-10">Let's Order Now!</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cafe-600 via-cafe-700 to-cafe-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-0" />
        </button>
      </div>

      <div className="relative mt-12 md:mt-0 z-10">
        {/* Multi-layered glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-cafe-200 to-cream-300 rounded-full blur-3xl opacity-50 scale-150 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-cafe-300 to-cream-400 rounded-full blur-2xl opacity-30 scale-125 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-0 bg-gradient-to-tl from-cafe-400 to-cream-200 rounded-full blur-xl opacity-40 scale-110" />
        
        <img
          ref={imageRef}
          src={burgerImg}
          alt="Delicious Burger"
          className="relative w-[500px] md:w-[700px] h-auto object-contain cursor-pointer"
          style={{
            filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 30px rgba(139, 69, 19, 0.3))',
            transformStyle: 'preserve-3d'
          }}
        />
        
        {/* Orbiting elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cafe-400 rounded-full opacity-60 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cream-500 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default HeroSection;