import upload from "../middlewares/upload.js";
import { eventModel } from "../models/eventModel.js";
import { userModel } from "../models/userModel.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      entryFee,
      category,
      createdBy,
    } = req.body;

    const imageName = req.file.filename;

    const event = await eventModel.create({
      title,
      description,
      image,
      imageName,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      entryFee,
      category,
      createdBy,
    });

    const user = await userModel.findOne({ _id: createdBy });
    console.log(user);
    await user.events.push(event._id);
    await user.save();

    console.log("Event created successfully!");
    res.status(200).json({
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: "from controller",
    });
  }
};

export const allEvents = async (req, res) => {
  try {
    const events = await eventModel.find();

    res.status(201).json({ events });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const userEvents = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    await user.populate("events");

    res.status(200).json({ events: user.events });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const event = await eventModel.findOne({ _id: req.params.id });

    const { userId } = req.body;
    var status;

    if (event.registeredUsers.indexOf(userId) === -1) {
      event.registeredUsers.push(userId);
      status = "Registered";
      await event.save();

    } else {
      event.registeredUsers.splice(event.registeredUsers.indexOf(userId), 1);
      status = "Unregistered";
      await event.save();
    }
    res.status(201).json({ status });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const singleEvent = async (req, res) => {
  try {
    const event = await eventModel.findOne({ _id: req.params.id });

    const { userId } = req.body;

    if (userId != event.createdBy) {
      event.impressions = event.impressions + 1;
      await event.save();
    }
    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const registrations = async (req, res) => {
  try {
    const event = await eventModel.findOne({ _id: req.params.id });

    await event.populate("registeredUsers")
    
    res.status(201).json({ registeredUsers: event.registeredUsers });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      entryFee,
      category,
      certificate,
      prizes,
      teamSize,
      contacts,
    } = req.body;

    const event = await eventModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        description,
        image,
        startDate,
        endDate,
        startTime,
        endTime,
        location,
        entryFee,
        category,
        certificate,
        prizes,
        teamSize,
        contacts,
      },
      { new: true }
    );

    if (req.file) {
      event.imageName = req.file.filename;
    }
    // if(contacts.length == 0) {
    //   event.contacts = [];
    // }
    // console.log(contacts);
    await event.save();

    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await eventModel.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
