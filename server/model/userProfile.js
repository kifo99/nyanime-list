import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  customLists: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],

  aboutMe: {
    type: String,
  },

  feed: [
    {
      postId: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Profile = mongoose.model("Profile", userProfileSchema);
