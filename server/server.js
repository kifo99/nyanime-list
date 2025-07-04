import { createServer } from "http";
import { Server } from "socket.io";
import { ChatRoom } from "./model/chatRoom.js";
import { Message } from "./model/message.js";

import app from "./app.js";
import mongoose from "mongoose";
import { MONGODB_URL } from "./util/config.js";
import { PORT } from "./util/config.js";
import { errorHandler } from "./util/helpers.js";

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
      const { members, message: text, name, isGroup, createdAt } = data;

      let chatRoom = await ChatRoom.findOne({
        members: members,
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

      const newMessage = new Message({
        chatRoomId: chatRoom._id,
        message: text,
        sentAt: createdAt,
      });

      await newMessage.save();
      console.log(newMessage);

      io.emit("message", `${socket.id.substring(0, 2)}: ${text}`);
    } catch (err) {
      console.error(err);
      socket.emit("error", {
        message: err.message || "Something went wrong. Please try again later.",
      });
    }
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
