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
      addedOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const Watchlist = mongoose.model("Watchlist", watchlistSchema);
