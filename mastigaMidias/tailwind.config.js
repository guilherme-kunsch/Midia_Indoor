// tailwind.config.js
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "dark-purple": "#081A51",
                "light-white": "rgba(255,255,255,0.17)",
                "cards": "#C2C6D4",
                "dark-blue": "#46547D",
                "flash-white": "#F0F1F5",
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                scrollText: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-1000%)' },
                },
                blink: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.6 },
                },
            },
            animation: {
                scrollText: 'scrollText 70s linear infinite',
                blink: 'blink 1s ease-in-out infinite',
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
}
