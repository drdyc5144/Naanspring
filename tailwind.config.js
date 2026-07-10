/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32",
          900: "#1B5E20",
        },
        secondary: {
          50: "#FFF3E0",
          100: "#FFE0B2",
          200: "#FFCC80",
          300: "#FFB74D",
          400: "#FFA726",
          500: "#F59E0B",
          600: "#FB8C00",
          700: "#F57C00",
          800: "#EF6C00",
          900: "#E65100",
        },
        gray: {
          50: "#F9FAFB",
          100: "#f3f4f6",
          200: "#E5E7EB",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6B7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        background: {
          DEFAULT: "#FFFFFF",
          light: "#F9FAFB",
        },
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
        },
        border: {
          DEFAULT: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
