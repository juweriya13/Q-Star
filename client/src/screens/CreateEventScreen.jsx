import React, { useEffect } from "react";
import Nav from "../components/Navbar";
import CreateEvent from "../components/Create/CreateEvent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";
import AuthContainer from "../components/AuthContainer";
import Footer from "../components/Footer";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function CreateEventScreen() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);
  return (
    <div>
      <div>
        <Nav />
        {user && <CreateEvent user={user} />}
      </div>

      <Footer />
    </div>
  );
}

export default CreateEventScreen;
