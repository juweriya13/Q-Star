import React, { useRef, useState } from "react";
import {
  Button,
  DateRangePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
} from "@nextui-org/react";
import axios from "axios";
import { getLocalTimeZone, today } from "@internationalized/date";
import UploadIcon from "../../assets/UploadIcon";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {formatTime} from '../../utils/utils'

const CreateEvent = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [eventDuration, setEventDuration] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });
  const [startTime, setStartTime] = useState({
    hour: 0,
    minute: 0,
  });
  const [endTime, setEndTime] = useState({
    hour: 0,
    minute: 0,
  });
  const [location, setLocation] = useState("");
  const [entryFee, setEntryFee] = useState("Free");
  const [categories, setCategories] = useState([]);
  const [createdBy, setCreatedBy] = useState(user._id);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
      console.log(image);
    }
  };

  const UploadImage = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e, user) => {
    e.preventDefault();

    const startDate = `${eventDuration.start.day}/${eventDuration.start.month}/${eventDuration.start.year}`;
    const endDate = `${eventDuration.end.day}/${eventDuration.end.month}/${eventDuration.end.year}`;
    const startTime2 = formatTime(startTime.hour, startTime.minute)
    const endTime2 = formatTime(endTime.hour, endTime.minute);
    const category = Array.from(categories);

    if (imageFile == null) {
      toast.error("Image is not uploaded");
      return;
    }
    console.log(createdBy);
    const formData = {
      title,
      description,
      image: imageFile,
      startDate,
      endDate,
      startTime: startTime2,
      endTime: endTime2,
      location,
      entryFee,
      category,
      createdBy,
    };

    try {
      console.log(formData);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/event/create`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Event Created Successfully");
      console.log("Event created successfully:", response.data.event);
      navigate(`/event/update/${response.data.event._id}`);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="w-full py-6 md:py-10">
      <form onSubmit={handleSubmit}>
        <div className="px-4 flex gap-10 w-full flex-col sm:flex-row items-center sm:items-start sm:justify-center">
          <div className="w-56 sm:w-96 overflow-hidden object-cover">
            <img
              src={
                image || "https://cdn-icons-png.flaticon.com/512/168/168726.png"
              }
              className="aspect-square rounded-xl w-full object-cover"
              alt="Event"
              name="image"
            />

            <Button
              className="w-full mt-2 bg-gradient-to-r from-fuchsia-600 to-blue-600"
              onClick={UploadImage}
            >
              {" "}
              <UploadIcon /> Upload Image
            </Button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <div className="w-full md:w-1/2 h-full md:pr-3 rounded-xl">
            <Input
              className="w-full mb-2 outline-red-500"
              type="text"
              label="Event Name"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              label="Description"
              className="w-full mb-2"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input
              className="w-full mb-2"
              type="text"
              label="Location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="flex gap-2 mb-2 flex-col xl:flex-row">
              <DateRangePicker
                isRequired
                label="Event Duration"
                className="w-full"
                minValue={today(getLocalTimeZone())}
                value={eventDuration}
                onChange={setEventDuration}
              />
              <div className="w-full flex gap-2">
                <TimeInput
                  isRequired
                  label="Start Time"
                  className="w-1/2"
                  value={startTime}
                  onChange={setStartTime}
                />
                <TimeInput
                  isRequired
                  label="End Time"
                  className="w-1/2"
                  value={endTime}
                  onChange={setEndTime}
                />
              </div>
            </div>

            <Input
              className="w-full mb-2"
              type="text"
              label="Entry Fee in Rupees"
              value={entryFee}
              onChange={(e) => setEntryFee(e.target.value)}
              isRequired
            />

            <Select
              selectionMode="multiple"
              placeholder="Select event category"
              selectedKeys={categories}
              className="w-full mb-2"
              onSelectionChange={setCategories}
              isRequired
            >
              <SelectItem key={"Cultural"}>Cultural</SelectItem>
              <SelectItem key={"Hackathon"}>Hackathon</SelectItem>
              <SelectItem key={"Competition"}>Competition</SelectItem>
              <SelectItem key={"Seminar"}>Seminar</SelectItem>
            </Select>
            <Button
              type="submit"
              variant="shadow"
              className="bg-gradient-to-r from-fuchsia-600 to-blue-600 w-full"
            >
              Create Event
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
