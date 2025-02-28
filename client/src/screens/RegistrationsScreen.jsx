import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../store/slices/userSlice";
import Registrations from "../components/Registration/Registrations";

function RegistrationsScreen() {
  const { eventId } = useParams();
  const [newUser, setNewUser] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState({});
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const fetchRegisteredUsers = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/event/registrations/${eventId}`,
        {userId: user?._id}
      );
      setRegisteredUsers(response.data);
    } catch (error) {
      if(error) navigate('/error');
      
    }
  };

  const fetchUser = async(user)=>{
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/user/profile`, {email: user.email});
      setNewUser(res.data);
      dispatch(login(res.data));
      if (res.data.events.indexOf(eventId) === -1) {
        navigate(`/event/${eventId}`);
      }
      else{
        fetchRegisteredUsers();
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUser(user); 
  },[]);
  return (
    <div>
      <Nav />
      <Registrations {...registeredUsers}/>
      {/* <Dashboard {...registeredUsers}/> */}

      <Footer/>
    </div>
  );
}

export default RegistrationsScreen;
