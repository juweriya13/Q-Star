import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  res.render("login");
};

export const createUser = async (req, res) => {
  try {
    console.log("in create user ")
    const { fullname, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user)
      return res.status(401).json({
        message: "User already exist",
      });

    bcrypt.hash(password, 10, async function (err, hash) {
      const createdUser = await userModel.create({
        fullname,
        email,
        password: hash,
      });

      const token = jwt.sign(
        { email, id: createdUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );
      res.cookie("token", token);
      console.log("User created successfully");
      res.status(200).redirect("/");
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(401).json({
        message: "Incorrect email or password",
      });

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { email, id: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
        res.cookie("token", token);

        user.password = null;
        res.status(200).json({
          token,
          user,
        });
      } else {
        res.status(500).json({
          message: "Incorrect email or password",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, state, city, college, image } = req.body;
    const user = await userModel.findOneAndUpdate(
      { email: req.params.email },
      {
        fullname,
        phoneNumber,
        state,
        city,
        college,
        image,
      },
      { new: true }
    );

    if (req.file) {
      user.profile = req.file.filename;
    }
    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userModel.findOneAndDelete({ email });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("token", "");
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
