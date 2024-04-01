/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FDE047',
        secondary: '#4339B0',
        secondary_dark: '#312E81',
        bg_gray: '#C8C8C8',
        bg_white: '#F8FAFC',
        color_primary: '#2F2F2F',
        color_secondary: '#5D5E5B',
        
        input: '#E4EBF4',

        iniciado: '#15B166',
        espera: '#F39C12',
        finalizada: '#ED2323',
        table: '#FFFFF0'
      },
    },
  },
  plugins: [],
}
