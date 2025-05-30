import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  watchlistId: {
    type: Schema.Types.ObjectId,
    ref: "Watchlist",
  },
  reviewsId: {
    type: Schema.Types.ObjectId,
    ref: "Reviews",
  },
  likesId: {
    type: Schema.Types.ObjectId,
    ref: "Likes",
  },
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
});

export const User = mongoose.model("User", userSchema);
