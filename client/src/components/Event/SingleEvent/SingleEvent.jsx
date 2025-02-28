import { Button, Chip, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Team from "./Team";
import Impressions from "./Impressions";
import { FilePen, Gift, List } from "lucide-react";
import prize from "../../../assets/Prize.svg";
import background from "../../../assets/background.jpg";
import toast from "react-hot-toast";
import axios from "axios";
// import Prize from "../../../assets/Prize"

function SingleEvent({
  imageName,
  title,
  description,
  certificate,
  entryFee,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  category = [],
  createdBy,
  contacts = {},
  eventId,
  impressions,
  teamSize = {},
  prizes = {},
  registeredUsers = []
}) {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  
  const register = async () => {
    try {
      
    if(!user){
      toast.error("Please login to register");
      navigate('/auth');
      return;
    }
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/event/register/${eventId}`,
        { userId: user._id }
      );
      toast.success(`${data.status} successfully`);
      setLoading(false);
      setStatus(data.status === "Unregistered" ? "Register" : "Unregister");
    } catch (error) {
      toast.error("Some error occurred");
      setLoading(false);
      console.log(error);
    }
  };
  
  useEffect(() => {
    setStatus(registeredUsers.indexOf(user?._id) === -1 ? "Register" : "Unregister");
  }, [registeredUsers]);
  
  return (
    <div className="w-full py-6 md:py-10">
      <div className="px-4 flex gap-10 w-full flex-col md:flex-row items-center md:items-start md:justify-center">
        <div className="w-full  flex flex-col items-center md:w-auto ">
          <div className="w-56 sm:w-72 overflow-hidden object-cover">
            <img
              src={`${import.meta.env.VITE_SERVER_IMAGES}/${imageName}`}
              className="aspect-square rounded-xl w-full object-cover"
              alt="Event"
              name="image"
            />
            {user?._id == createdBy ? (
              <>
              <Button
                className="w-full mt-2 bg-gradient-to-r from-fuchsia-600 to-blue-600  font-medium tracking-wide"
                onClick={() => {
                  navigate(`/event/update/${eventId}`);
                }}
                >
                <FilePen height={16} width={16} strokeWidth={2.2} />
                Update Event Details
              </Button>
              <Button
                className="w-full mt-2 bg-gradient-to-r from-fuchsia-600 to-blue-600  font-medium tracking-wide"
                onClick={() => {
                  navigate(`/event/registrations/${eventId}`);
                }}
                >
                <List height={16} width={16} strokeWidth={2.2} />
                See Registered Users
              </Button>
                </>
            ) : (
              <Button
                className="w-full mt-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 font-medium tracking-wide"
                onClick={register}
                isLoading={loading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user-plus"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
                {status}
              </Button>
            )}
          </div>
          <div className="w-full mt-2">
            <div className="flex gap-1">
              <Impressions impressions={impressions} />
              {teamSize.participation != "individual" && (
                <Team team={teamSize} />
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full md:pr-3 rounded-xl">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl text-purple-500 mb-5 font-medium">
            {title}
          </h1>
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            <Chip size="md" color="warning" variant="dot">
              {entryFee === "Free" ? <>{entryFee}</> : <>Rs. {entryFee}</>}
            </Chip>
            {certificate == "Yes" && (
              <Chip size="md" color="warning" variant="dot">
                Certificate
              </Chip>
            )}
            {category.map((cat) => {
              return (
                <Chip size="md" color="warning" variant="dot" key={cat}>
                  {cat}
                </Chip>
              );
            })}
          </div>
          {/* Location */}
          <h1 className="flex items-center mt-4 text-sm gap-1">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </h1>
          {/* Dates and Times */}
          <div className="md:flex gap-4 my-1 flex-wrap">
            <h1 className="text-sm font-light tracking-wide">
              <span className="font-medium text-purple-400">Start:</span>{" "}
              {startDate}, {startTime}
            </h1>
            <h1 className="text-sm font-light tracking-wide">
              <span className="font-medium text-purple-400">End:</span> &ensp;
              {endDate}, {endTime}
            </h1>
          </div>
          <hr className="opacity-50 my-5" />
          {/* Description */}
          <div className="mb-6">
            <h1 className="font-medium text-purple-400 text-lg mb-2">
              Description
            </h1>
            <pre className="font-light text-sm bg-zinc-900 p-3 rounded-lg">
              {description}
            </pre>
          </div>

          {(prizes.available == "Yes" || contacts.contact == "Yes") && <hr className="opacity-50 my-5" />}

          {/* Prize and contact */}
          <div className="flex flex-col md:flex-row md:gap-2">
            {/* Prizes */}
            {prizes.available == "Yes" && (
              <div className=" w-full">
                <h1 className="font-medium text-purple-400 text-lg mb-2">
                  Prizes
                </h1>
                <div className="md:h-28 text-sm bg-zinc-900 p-3 rounded-lg space-y-1">
                  <div className="flex  gap-1 items-center">
                    <img src={prize} className="w-6 h-6" />
                    <h1 className="">{prizes.firstPrize}</h1>
                  </div>
                  <div className="flex  gap-1 items-center">
                    <img src={prize} className="w-6 h-6" />
                    <h1 className="">{prizes.secondPrize}</h1>
                  </div>
                  <div className="flex  gap-1 items-center">
                    <img src={prize} className="w-6 h-6" />
                    <h1 className="">{prizes.thirdPrize}</h1>
                  </div>
                </div>
              </div>
            )}

            <hr className="opacity-50 my-5 md:hidden" />

            {/* Contact */}
            {contacts.contact == "Yes" && (
              <div className="w-full ">
                <h1 className="font-medium text-purple-400 text-lg mb-2">
                  Contact
                </h1>
                <div className="md:h-28 text-sm bg-zinc-900 p-3 rounded-lg space-y-1">
                  <>
                    <div className="flex flex-col gap-1 ">
                      <div className="flex gap-1 ">
                        <h1 className="font-medium text-yellow-400">Name : </h1>
                        <h1 className="">{contacts.name}</h1>
                      </div>
                      <div className="flex gap-1 ">
                        <h1 className="font-medium text-yellow-400">
                          Contact :{" "}
                        </h1>
                        <h1 className="">{contacts.phoneNumber}</h1>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            )}
          </div>

          {(prizes.available == "Yes" || contacts.contact == "Yes") && <hr className="opacity-50 my-5" />}
        </div>
      </div>
    </div>
  );
}

export default SingleEvent;
