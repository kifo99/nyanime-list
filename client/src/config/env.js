const isDev = import.meta.env.MODE === "development";
export const protocol = isDev ? "https" : "http";
export const host = isDev ? "localhost:8080" : "your-production-backend.com";