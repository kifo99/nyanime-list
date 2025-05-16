import mongoose from "mongoose";

const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  type: {
    type: String,
    enum: ["default", "custom"],
    default: "default",
  },

  name: {
    type: String,
    required: function () {
      return this.type === "custom";
    },
  },

  items: [
    {
      animeId: {
        type: String,
        require: true,
      },
      title: {
        type: String,
        require: true,
      },
      titleJapanese: {
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
