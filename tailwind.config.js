/** @type {import('tailwindcss').Config} */
export default {
  // El tema se controla con la clase `dark` en <html>, puesta por src/theme.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // El acento se resuelve en tiempo de ejecucion: los valores viven en
        // index.css y cambian con el atributo data-accent del <html>.
        brand: {
          50: 'rgb(var(--brand-50) / <alpha-value>)',
          100: 'rgb(var(--brand-100) / <alpha-value>)',
          200: 'rgb(var(--brand-200) / <alpha-value>)',
          300: 'rgb(var(--brand-300) / <alpha-value>)',
          400: 'rgb(var(--brand-400) / <alpha-value>)',
          500: 'rgb(var(--brand-500) / <alpha-value>)',
          600: 'rgb(var(--brand-600) / <alpha-value>)',
          700: 'rgb(var(--brand-700) / <alpha-value>)',
          800: 'rgb(var(--brand-800) / <alpha-value>)',
          900: 'rgb(var(--brand-900) / <alpha-value>)',
        },
        // Grises neutros frios para el tema oscuro. Sin tinte calido: el unico
        // color de la interfaz oscura es el naranja de marca, a plena fuerza.
        ink: {
          600: '#2e2e33', // chips / botones secundarios
          700: '#212126', // superficies apagadas
          800: '#16161a', // tarjetas y paneles
          900: '#0e0e10', // fondo de pagina
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
