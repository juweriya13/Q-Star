import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Navbar";
import SingleEvent from "../components/Event/SingleEvent/SingleEvent";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";

function SingleEventScreen() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/event/find/${eventId}`,
        {userId: user?._id}
      );
      setEvent(response.data.event);
      console.log(response.data.event);
    } catch (error) {
      if(error) navigate('/error');
      
    }
  };

  useEffect(() => {
    fetchEvent();
  },[]);
  return (
    <div>
      <Nav />
      <SingleEvent {...event} eventId={eventId}/>
      <Footer/>
    </div>
  );
}

export default SingleEventScreen;
