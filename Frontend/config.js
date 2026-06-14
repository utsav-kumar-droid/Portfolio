const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000" // Uses local backend when testing on your machine
    : "https://portfolio-1-dsb1.onrender.com"; // Fallback to live backend on Vercel