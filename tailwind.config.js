/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#AB0906', 
                secondary: '#FBB040',
                primaryText: '#1F1F1F',
            }, 
            fontFamily: {
                josefin: ["Josefin Sans", "sans-serif"],
              }
        },
    },
    plugins: [],
};
