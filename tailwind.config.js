/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        lightMode :{
          'text': '#0d0f12',
          'background': '#f9fafb',
          'primary': '#72819d',
          'secondary': '#c7aebd',
          'accent': '#b18c8f',
        },
        darkMode :{
          colors: {
            'text': '#edeff2',
            'background': '#111314',
            'primary': '#62718d',
            'secondary': '#513847',
            'accent': '#734e52',
          },   
        }
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

