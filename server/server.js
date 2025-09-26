import fs from "fs";
import http from "http";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { ChatRoom } from "./model/chatRoom.js";
import { Message } from "./model/message.js";

import app from "./app.js";
import mongoose from "mongoose";
import { MONGODB_URL, NODE_ENV } from "./util/config.js";
import { PORT } from "./util/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const certPath = path.join(__dirname, "../certs");

let httpServer;

if (NODE_ENV === "development") {
  try {
    const options = {
      key: fs.readFileSync(path.join(certPath, "server.key")),
      cert: fs.readFileSync(path.join(certPath, "server.cert")),
    };

    httpServer = https.createServer(options, app);
    console.log("🔐 Using Https (self signed) for local development");
  } catch (err) {
    console.warn("No ssl certs found, falling back to Http");
    httpServer = http.createServer(app);
  }
} else {
  console.log("🌍 Using Http (platform provides Https in production");
  httpServer = http.createServer(app);
}

const io = new Server(httpServer, {
  cors: {
    origin:
      NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://my-frontend-domain.com",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User is connected!", socket.id);

  socket.on("message", async (data) => {
    try {
      const { chatRoomId, sender, message: text, sentAt } = data;

      const chatRoom = await ChatRoom.findById(chatRoomId);

      if (!chatRoom) {
        return socket.emit("error", { message: "Chat room not found." });
      }

      const newMessage = new Message({
        chatRoomId: chatRoom._id,
        senderId: sender,
        message: text,
        sentAt: sentAt,
      });

      await newMessage.save();

      io.to(chatRoom._id.toString()).emit("newMessage", newMessage);
    } catch (err) {
      console.error(err);
      socket.emit("error", {
        message: err.message || "Something went wrong. Please try again later.",
      });
    }
  });

  socket.on("startChat", async (data, callback) => {
    try {
      const { members, name, isGroup, createdAt } = data;

      let chatRoom = await ChatRoom.findOne({
        members: { $all: members, $size: members.length },
      });

      if (!chatRoom) {
        chatRoom = new ChatRoom({
          members,
          name,
          isGroup,
          createdAt,
        });
        await chatRoom.save();
      }

      socket.join(chatRoom._id.toString());

      if (callback) callback({ success: true, chatRoom });
    } catch (err) {
      console.error(err);
      if (callback) {
        callback({ success: false, message: err.message });
      } else {
        socket.emit("error", {
          message: err.message || "StartChat failed.",
        });
      }
    }
  });

  socket.on("joinChat", (chatRoomId) => {
    socket.join(chatRoomId);
  });
});

const startServer = async function () {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected");
    httpServer.listen(PORT || 8000, () =>
      console.log(
        `🚀 Server running on  ${
          NODE_ENV === "development"
            ? `https://localhost:${PORT || 8000}`
            : `http://0.0.0.0:${PORT || 8000}`
        }`
      )
    );
  } catch (err) {
    console.error(err);
  }
};

startServer();
