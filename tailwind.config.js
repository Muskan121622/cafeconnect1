module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'text-gray-800',
    'text-blue-600',
    'mb-4',
    'mb-8'
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        cafe: {
          50: '#fdf8f3',
          100: '#f7e6d3',
          200: '#edc9a3',
          300: '#e1a373',
          400: '#d4834f',
          500: '#c4692f',
          600: '#a8522a',
          700: '#8b3f26',
          800: '#6f3323',
          900: '#5a2a1f',
        },
        cream: {
          50: '#fefcf9',
          100: '#fdf6ed',
          200: '#f9e6d0',
          300: '#f4d0a7',
          400: '#edb572',
          500: '#e69c4a',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/path-to-your-bg.jpg')",
        'coffee-gradient': 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #F4A460 100%)',
        'cream-gradient': 'linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 50%, #DEB887 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'cafe': '0 4px 20px -2px rgba(139, 69, 19, 0.1), 0 2px 8px -2px rgba(139, 69, 19, 0.06)',
        '3d': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 20px 40px -10px rgba(0, 0, 0, 0.1)',
        '3d-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 25px 50px -10px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
