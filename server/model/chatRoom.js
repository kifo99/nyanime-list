import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],

  name: {
    type: String,
  },

  isGroup: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
