import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../store/slices/userSlice";
import Profile from "../components/Profile/Profile";
import EventCard from "../components/Event/EventCard";
import axios from "axios";
import Footer from "../components/Footer";

function ProfileScreen() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const email = user?.email;

  const fetchUser = async (user) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/user/profile`,
        { email: user.email }
      );
      // setNewUser(res.data);
      dispatch(login(res.data));
    } catch (err) {
      console.log(err);
      navigate(`/profile`);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/event/user/events`,
        { email }
      );
      setEvents(response.data.events.reverse());
      console.log(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchUser(user);
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  return (
    <div>
      <Nav />
      {user && <Profile user={user} />}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-10 pb-10">
        <h1 className="text-xl mb-4 font-semibold">Created Events</h1>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                image={`${import.meta.env.VITE_SERVER_IMAGES}/${
                  event.imageName
                }`}
                startDate={event.startDate}
                startTime={event.startTime}
                location={event.location}
                entryFee={event.entryFee}
              />
            ))
          ) : (
            <div
              onClick={() => navigate("/create")}
              className="text-center w-48 h-32 rounded-lg bg-gradient-to-r flex flex-col justify-center items-center from-fuchsia-600 to-blue-600 cursor-pointer"
            >
              <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="fuchsia"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>{" "}
              <h1>Create event</h1>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileScreen;
