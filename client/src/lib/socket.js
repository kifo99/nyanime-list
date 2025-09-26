import { io } from "socket.io-client";

const isDev = import.meta.env.MODE === "development";
const protocol = isDev ? "https" : "http";
const host = isDev ? "localhost:8080" : "your-production-backend.com";

export const socket = io(`${protocol}://${host}`, {
  withCredentials: true,
  autoConnect: true,
});
