/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "var(--secondary-dark)",
        },
        accent: "var(--accent)",
        gray: {
          light: "var(--gray-light)",
          DEFAULT: "var(--gray)",
          dark: "var(--gray-dark)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      boxShadow: {
        card: "var(--card-shadow)",
        "card-hover": "var(--card-shadow-hover)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-delay-1": "fadeIn 0.8s ease-out 0.2s forwards",
        "fade-in-delay-2": "fadeIn 0.8s ease-out 0.4s forwards",
        "fade-in-delay-3": "fadeIn 0.8s ease-out 0.6s forwards",
        "fade-in-delay-4": "fadeIn 0.8s ease-out 0.8s forwards",
        float: "float 5s ease-in-out infinite",
        pulse: "pulse 2s infinite",
        gradient: "gradient 3s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        pulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(14, 165, 233, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(14, 165, 233, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(14, 165, 233, 0)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.shadow-opacity-20': {
          '--tw-shadow-color': 'rgba(var(--tw-shadow-color-rgb), 0.2)',
        },
      }
      addUtilities(newUtilities, ['hover'])
    },
  ],
}; 