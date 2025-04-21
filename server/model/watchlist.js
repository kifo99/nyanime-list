import mongoose from "mongoose";

const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  items: [
    {
      animeId: {
        type: String,
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
      score: {
        type: String,
        require: true,
      },
      episodes: {
        type: Number,
        require: true,
      },
      addedOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const Watchlist = mongoose.model("Watchlist", watchlistSchema);
