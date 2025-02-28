import { userModel } from "../models/userModel.js";
import jsonwebtoken from "jsonwebtoken";

export const isLoggedin = async (req, res, next) => {
  try { 
    // const token = req.body.userToken;
    // if (!token)
    //   return res.json({message:"User is not Logged in"});
    // const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    const {email} = req.body;
    req.user = await userModel.findOne({ email });
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
