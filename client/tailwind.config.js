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
            },
            rotate180: {
                '0%': {
                    transform: 'rotate(0)'
                },
                '100%': {
                    transform: 'rotate(180deg)'
                },
            },
            rotate180Back: {
                '0%': {
                    transform: 'rotate(180deg)'
                },
                '100%': {
                    transform: 'rotate(0)'
                },
            },
            visibleBottom: {
                '0%': {
                    transform: 'matrix(0, 0, 0, 0, 0, -50%)',
                },
                '100%': {
                    transform: 'matrix(0, 0, 0, 1, 0, 0%)'
                },
            },
            visibleBottomBack: {
                '0%': {
                    transform: 'scaleY(1)'
                },
                '100%': {
                    transform: 'scaleY(0)'
                },
            }

        },
        transitionProperty: {
            'height': 'height',
        }
    
        
    },
  },
  plugins: [],
}


