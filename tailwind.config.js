module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    important: "body",
    theme: {
        extend: {
            colors: {
                primary: "#0052d4",
                secondary: "#5371f7",
                "background-dark": "#1f1d2e",
                "background-light": "#333147",
                "background-extralight": "#474561",
                border: "#4d4d4d73",
                muted: "#939394f0",
                white: "#fdfeff",
                red: "#d64214",
                page: {
                    home: "#fe7654",
                    trending: "#1aba9c",
                    playlist: "#e0059f",
                    likedsongs: "#1fdf64",
                    search: "#f12a7fff",
                    category: "#3a647aff",
                    singer: "#b86610"
                }
            },
            screens: {
                xs: "0",
                sm: "600px",
                md: "900px",
                lg: "1200px",
                xl: "1360px",
            },
            backgroundImage: {
                "purple-gradient": "radial-gradient(circle, #2d244d 0%, #2d244df0 59%)",
                "first-blue-gradient": "radial-gradient(circle, #2b3d5cbb 0%, #2b3d5cf6 59%)",
                "second-blue-gradient": "radial-gradient(circle, #3a647a 0%, #3a647aea 59%)",
                "third-blue-gradient": "radial-gradient(circle, #2a3e5e 0%, #2a3e5ef1 59%)",
            },
            animation: { 
                "show": "show .15s linear both",
                "transform-x": "transform-x 1.5s ease-out infinite"
            },
            keyframes: {
                "show": {
                    "0%": { opacity: 0, transform: "translateY(10px)" },
                    "100%": { opacity: 1, transform: "none" },
                },
                "transform-x": {
                    "0%": { transform: "translateX(-100%)" },
                    "50%": { transform: "translateX(0)" },
                    "70%": { transform: "translateX(20%)" },
                    "80%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(100%)" },
                }
            },
            fontSize: {
                "size-inherit": "inherit"
            }
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('tailwindcss-touch')(),
    ],
    corePlugins: {
        preflight: false,
    }
};
