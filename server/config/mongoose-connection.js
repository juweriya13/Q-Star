import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.log("Error in connecting the database: ", error);
  }
};
