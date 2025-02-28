import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../store/slices/userSlice";
import AuthContainer from "../components/AuthContainer";
import Footer from "../components/Footer";
import axios from "axios";
import ProfileSettings from "../components/Settings/ProfileSettings";

function ProfileSettingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [newUser, setNewUser] = useState("");

  const fetchUser = async (user) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/user/profile`,
        { email: user.email }
      );
      setNewUser(res.data);
      dispatch(login(res.data));

    } catch (err) {
      console.log(err);
      navigate(`/profile`);
    }
  };

  useEffect(() => {
    fetchUser(user);
  }, [user]);
  return (
    <div>
      <div>
        <Nav />
        {user && <ProfileSettings user={user} />}
      </div>
      {!user && (
        <div className="absolute top-0 w-full h-screen z-50 backdrop-blur-3xl">
          {" "}
          <Nav /> <AuthContainer />{" "}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ProfileSettingScreen;
