/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
        keyframes: {
            wiggle: {
              '0%': { 
                    transform: 'translateY(0px)',
                    border: '1px solid rgba(6,18,36,.1)',
                    boxShadow: '0 0 0 0 rgba(10,42,105,.06)'
               },
              '100%': { 
                    transform: 'translateY(-3px)' ,
                    border: '1px solid #b4c0e0',
                    boxShadow: '0 10px 20px -5px rgba(10,42,105,.06)'
               },
            },
            wiggle2: {
                '0%': {
                      border: '1px solid rgba(6,18,36,.1)',
                      boxShadow: '0 0 0 0 rgba(10,42,105,.06)'
                 },
                '100%': {
                      border: '1px solid #3c65f5',
                      boxShadow: '0 10px 20px -5px rgba(10,42,105,.06)'
                 },
              }
        }
        
    },
  },
  plugins: [],
}

