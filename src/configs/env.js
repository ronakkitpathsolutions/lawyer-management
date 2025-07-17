// Environment type (development, production, staging)
export const ENV = import.meta.env.VITE_APP_ENV || "development";

// API configuration
export const API = {
  URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
};