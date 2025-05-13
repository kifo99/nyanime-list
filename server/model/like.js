import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  animeId: {
    type: String,
    required: true,
  },
});
