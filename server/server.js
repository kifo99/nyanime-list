import { createServer } from "http";
import { Server } from "socket.io";
import { ChatRoom } from "./model/chatRoom.js";
import { Message } from "./model/message.js";

import app from "./app.js";
import mongoose from "mongoose";
import { MONGODB_URL } from "./util/config.js";
import { PORT } from "./util/config.js";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
  methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  //socket logic
  console.log("User is connected!", socket.id);

  socket.on("message", async (data) => {
    try {
      const { members, sender, message: text, createdAt } = data;

      const chatRoom = await ChatRoom.findOne({
        members: { $all: members, $size: members.length },
      });

      if (!chatRoom) {
        return socket.emit("error", { message: "Chat room not found." });
      }

      const newMessage = new Message({
        chatRoomId: chatRoom._id,
        senderId: sender,
        message: text,
        sentAt: createdAt,
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
      console.log(`🚀 Server running on port ${PORT || 8000}`)
    );
  } catch (err) {
    console.error(err);
  }
};

startServer();
