import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [
    {
      animeId: {
        type: String,
        required: true,
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
      year: {
        type: String,
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
      watchedOn: {
        type: Date,
      },
      watchedBefore: {
        type: Boolean,
        default: false,
      },
      rating: {
        type: Number,
        default: null,
      },
      tags: {
        type: String,
        default: null,
      },
      like: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export const Reviews = mongoose.model("Reviews", reviewsSchema);
