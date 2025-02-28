import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  AutocompleteItem,
  Autocomplete,
} from "@nextui-org/react";
import axios from "axios";
import UploadIcon from "../../assets/UploadIcon";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import Colleges from "../../utils/Colleges.json";
import States from "../../utils/States.json";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";

function ProfileSettings({ user = {} }) {
  const [name, setName] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [college, setCollege] = useState(user.college);
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState(user.city);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [fetchedImage, setFetchedImage] = useState(user.profile);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    if(name == "" || email == "" || phoneNumber == "" || state == "" || city == "" || college == ""){
      toast.error("Please fill all the fields");
      return;
    }
    const formData = {
      fullname: name,
      email,
      phoneNumber,
      state,
      city,
      college,
      image: imageFile,
    };

    try {
      console.log(formData);
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URI}/user/update/${email}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Profile updated Successfully");

      navigate(`/profile`);
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error Updating event:", error);
    }
  };

  const DeleteUser = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URI}/user/delete/${email}`
      );
      dispatch(logout());

      toast.success("Account Deleted Successfully");
    } catch (error) {
      toast.error("Error Deleting Account");
      console.error("Error Deleting Account:", error);
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
              alt="User Profile"
              name="image"
            />

            <Button
              className="w-full mt-2 bg-gradient-to-r from-fuchsia-600 to-blue-600"
              onClick={UploadImage}
            >
              <UploadIcon /> Upload Image
            </Button>
            <Button className="w-full mt-2" color="danger" onPress={onOpen}>
              <Trash width={16} height={16} strokeWidth={2.5} /> Delete Account
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
                        <p>Are you sure you want to delete your account?</p>
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
                          onPress={DeleteUser}
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
              label="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                className="w-full"
                type="text"
                label="Email"
                required
                value={email}
                onChange={(e) => setName(e.target.value)}
                isDisabled
              />
              <Input
                className="w-full mb-2"
                type="number"
                label="Phone Number"
                pattern="[0-9]{10}"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <Autocomplete
                isRequired
                label="Select Your State"
                selectedKey={state}
                onSelectionChange={setState}
              >
                {States.map((state) => (
                  <AutocompleteItem key={state} value={state}>
                    {state}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Input
                className="w-full mb-2"
                type="text"
                label="Enter Your City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <Autocomplete
              label="Select Your Institute"
              selectedKey={college}
              className="mb-2"
              onSelectionChange={setCollege}
              allowsCustomValue={true}
              isRequired
            >
              {Colleges.map((college) => (
                <AutocompleteItem key={college} value={college}>
                  {college}
                </AutocompleteItem>
              ))}
            </Autocomplete>

            <Button
              type="submit"
              variant="shadow"
              className="bg-gradient-to-r from-fuchsia-600 to-blue-600 w-full"
            >
              Update Profile
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileSettings;
