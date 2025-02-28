import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  DateRangePicker,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { getLocalTimeZone, today } from "@internationalized/date";
import UploadIcon from "../../assets/UploadIcon";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { formatTime, parseTime } from "../../utils/utils";
import { Trash } from "lucide-react";

function UpdateEvent({ user }) {
  const { eventId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fetchedImage, setFetchedImage] = useState("");
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
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [createdBy, setCreatedBy] = useState(user._id);
  const [certificate, setCertificate] = useState("No");
  const [participation, setParticipation] = useState("");
  const [teamSize, setTeamSize] = useState({ min: null, max: null });
  const [prizes, setprizes] = useState({ available: "No" });
  const [contacts, setContacts] = useState({ name: "", phoneNumber: "" });
  const [showContacts, setShowContacts] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleParticipationChange = (e) => {
    const value = e.target.value;
    setParticipation(value);

    if (value === "individual") {
      setTeamSize({ participation: "individual", min: 1, max: 1 });
    } else if (value === "fixed") {
      setTeamSize({ participation: "fixed", min: 2, max: 2 }); // Example initial fixed value
    } else if (value === "variable") {
      setTeamSize({ participation: "variable", min: 1, max: 2 }); // Example initial values
    }
  };

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamSize((prevTeam) => ({
      ...prevTeam,
      [name]: Number(value),
    }));
  };

  const handleFixedTeamChange = (e) => {
    const value = Number(e.target.value);
    setTeamSize({ participation: "fixed", min: value, max: value });
  };

  const handlePrizeValue = (e) => {
    const value = e.target.value;
    if (value === "Yes") {
      setprizes({
        available: "Yes",
        firstPrize: "",
        secondPrize: "",
        thirdPrize: "",
      });
    } else {
      setprizes({ available: "No" });
    }
  };

  const handlePrizeChange = (e) => {
    const { name, value } = e.target;
    setprizes((prevPrize) => ({
      ...prevPrize,
      [name]: value,
    }));
  };

  const handleContactValue = (e) => {
    const value = e.target.value;

    if (value === "Yes") {
      setContacts({ contact: "Yes", name: "", phoneNumber: "" });
    } else {
      setContacts({ contact: "No" });
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContacts((contact) => ({
      ...contact,
      [name]: value,
    }));
  };

  const fetchEvent = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URI}/event/find/${eventId}`
    );
    setTitle(data.event.title);
    setDescription(data.event.description);
    setLocation(data.event.location);
    setEntryFee(data.event.entryFee);
    setCategories(data.event.category);
    setStartTime(parseTime(data.event.startTime));
    setEndTime(parseTime(data.event.endTime));
    setFetchedImage(data.event.imageName);
    setCertificate(data.event.certificate);
    setParticipation(data.event.teamSize.participation);
    setTeamSize(data.event.teamSize);
    setprizes(data.event.prizes);
    setShowContacts(data.event.contacts ? "Yes" : "No");
    setContacts(data.event.contacts);
  };

  const DeleteEvent = () => {
    try {
      const { data } = axios.delete(
        `${import.meta.env.VITE_SERVER_URI}/event/delete/${eventId}`
      );
      toast.success("Event deleted successfully");
      navigate("/events");
    } catch (error) {
      toast.error("Error deleting event");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const UploadImage = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = `${eventDuration.start.day}/${eventDuration.start.month}/${eventDuration.start.year}`;
    const endDate = `${eventDuration.end.day}/${eventDuration.end.month}/${eventDuration.end.year}`;
    const startTime2 = formatTime(startTime.hour, startTime.minute);
    const endTime2 = formatTime(endTime.hour, endTime.minute);
    const category = Array.from(categories);

    // console.log(createdBy);
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
      certificate,
      prizes,
      teamSize,
      contacts,
    };

    try {
      console.log(formData);
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URI}/event/update/${eventId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Event updated Successfully");

      // console.log("Event created successfully:", response.data.event);
      navigate(`/event/${response.data.event._id}`);
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
                image || `${import.meta.env.VITE_SERVER_IMAGES}/${fetchedImage}`
              }
              className="aspect-square rounded-xl w-full object-cover"
              alt="Event"
              name="image"
            />

            <Button
              className="w-full mt-2 bg-gradient-to-r from-fuchsia-600 to-blue-600"
              onClick={UploadImage}
            >
              <UploadIcon /> Upload Image
            </Button>
            <Button className="w-full mt-2" color="danger" onPress={onOpen}>
              <Trash width={16} height={16} strokeWidth={2.5} /> Delete Event
            </Button>
            <>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                className="dark"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 text-white">
                        Confirm Delete
                      </ModalHeader>
                      <ModalBody className="text-zinc-300">
                        <p>Are you sure you want to delete this event?</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="default"
                          variant="light"
                          onPress={onClose}
                        >
                          No
                        </Button>
                        <Button
                          color="danger"
                          variant="flat"
                          onPress={DeleteEvent}
                        >
                          Delete
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
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
              className="w-full mb-2"
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

            <div className="dark flex gap-2 mb-2 flex-col xl:flex-row">
              <DateRangePicker
                isRequired
                label="Event Duration"
                className="w-full"
                minValue={today(getLocalTimeZone())}
                value={eventDuration}
                onChange={setEventDuration}
                color="dark"
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

            <div className=" gap-3 mb-2">
              {/* Participation Certificate */}
              <div className="p-3 mb-2 border-2 rounded-lg border-zinc-800 ">
                <RadioGroup
                  label="Participation Certificate?"
                  value={certificate}
                  onValueChange={setCertificate}
                  size="sm"
                >
                  <Radio value="No">No</Radio>
                  <Radio value="Yes">Yes</Radio>
                </RadioGroup>
              </div>

              {/* Individual Participation */}
              <div className="p-3 d mb-2 border-2 rounded-lg border-zinc-800 flex flex-col sm:flex-row items-start gap-2">
                <RadioGroup
                  label="Team Size?"
                  value={participation}
                  onValueChange={setParticipation}
                  onChange={handleParticipationChange}
                  size="sm"
                  className="w-full"
                >
                  <Radio value="individual">Individual Participation</Radio>
                  <Radio value="fixed">Fixed Team Size</Radio>
                  <Radio value="variable">Variable Team Size</Radio>
                </RadioGroup>

                {participation === "fixed" ? (
                  <Input
                    className="w-full mt-2 justify-end"
                    type="number"
                    label="Team Size"
                    name="fixedTeamSize"
                    value={teamSize.max}
                    onChange={handleFixedTeamChange}
                    isRequired
                    size="sm"
                  />
                ) : (
                  participation === "variable" && (
                    <div className="w-full mt-2">
                      <Input
                        className="w-full mb-2"
                        type="number"
                        label="Min Team Size"
                        name="min"
                        value={teamSize.min}
                        onChange={handleTeamChange}
                        isRequired
                        size="sm"
                        min={1}
                        max={teamSize.max - 1} // Ensuring min is less than max
                      />
                      <Input
                        className="w-full"
                        type="number"
                        label="Max Team Size"
                        name="max"
                        value={teamSize.max}
                        onChange={handleTeamChange}
                        isRequired
                        size="sm"
                        min={teamSize.min + 1} // Ensuring max is greater than min
                      />
                    </div>
                  )
                )}
              </div>

              {/* Prize */}
              <div className="p-3 mb-2 border-2 rounded-lg border-zinc-800  flex flex-col sm:flex-row items-start gap-2 ">
                <RadioGroup
                  label="Prize?"
                  value={prizes.available}
                  onChange={handlePrizeValue}
                  size="sm"
                  // defaultValue="No"
                  className="w-full"
                >
                  <Radio value="No">No</Radio>
                  <Radio value="Yes">Yes</Radio>
                </RadioGroup>

                {prizes.available === "Yes" && (
                  <div className="w-full sm:mt-2 ">
                    <Input
                      className="w-full mt-2  justify-end"
                      type="text"
                      label="First Prize"
                      name="firstPrize"
                      value={prizes.firstPrize}
                      onChange={handlePrizeChange}
                      isRequired
                      size="sm"
                    />
                    <Input
                      className="w-full mt-2  justify-end"
                      type="text"
                      label="Second Prize"
                      name="secondPrize"
                      value={prizes.secondPrize}
                      onChange={handlePrizeChange}
                      isRequired
                      size="sm"
                    />
                    <Input
                      className="w-full mt-2  justify-end"
                      type="text"
                      label="Third Prize"
                      name="thirdPrize"
                      value={prizes.thirdPrize}
                      onChange={handlePrizeChange}
                      isRequired
                      size="sm"
                    />
                  </div>
                )}
              </div>

              {/* Contact Details */}
              <div className="p-3 d mb-2 border-2 rounded-lg border-zinc-800 flex flex-col gap-2">
                <RadioGroup
                  label="Add Contact Details"
                  value={contacts.contact}
                  onChange={handleContactValue}
                  size="sm"
                  className="w-full"
                >
                  <Radio value="No">No</Radio>
                  <Radio value="Yes">Yes</Radio>
                </RadioGroup>
                {/* {showContacts} */}

                {contacts.contact === "Yes" && (
                  <div className="w-full sm:mt-2 ">
                    <Input
                      className="w-full mt-2  justify-end"
                      type="text"
                      label="Name"
                      name="name"
                      value={contacts.name}
                      onChange={handleContactChange}
                      isRequired
                      size="sm"
                    />
                    <Input
                      className="w-full mt-2  justify-end"
                      type="text"
                      label="Contact Number"
                      name="phoneNumber"
                      value={contacts.phoneNumber}
                      onChange={handleContactChange}
                      isRequired
                      size="sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="shadow"
              className="bg-gradient-to-r from-fuchsia-600 to-blue-600 w-full"
            >
              Update Event
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateEvent;
