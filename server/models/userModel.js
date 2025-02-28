import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
      default: "default_profile.jpg",
    },
    college: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    registeredEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
