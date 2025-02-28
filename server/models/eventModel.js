import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    imageName: {
      type: String,
      default: "defaultImage.jpg",
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    location: {
      type: String,
    },
    entryFee: {
      type: String,
      default: "Free",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    category: {
      type: Object,
    },
    certificate: {
      type: String,
      default: "No",
    },
    prizes: {
      available: { type: String, default: "No" },
      firstPrize: String,
      secondPrize: String,
      thirdPrize: String,
    },
    impressions: {
      type: Number,
      default: 0,
    },
    teamSize: {
      participation: {
        type: String,
        default: "individual",
      },
      min: {
        type: Number,
        default: 1,
      },
      max: {
        type: Number,
      },
    },
    contacts: { 
      contact: {type: String, default: "No"},
      name: String,
      phoneNumber: Number,
    },
  },
  { timestamps: true }
);

export const eventModel = mongoose.model("Event", eventSchema);
