import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likedAnime: [
    {
      animeId: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Likes = mongoose.model("Likes", likesSchema);
