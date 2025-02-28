import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../store/slices/userSlice";
import toast from "react-hot-toast";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";

function Profile({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-center gap-10 mt-10 md:mt-4">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody className="bg-gradient-to-br md:bg-gradient-to-r from-zinc-900 to-blue-900">
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center text-center ">
              <div className="relative col-span-6 md:col-span-4  w-36 sm:w-auto mx-auto aspect-square">
                <Image
                  alt="Album cover"
                  className="object-cover aspect-square"
                  height={200}
                  shadow="md"
                  src={`${import.meta.env.VITE_SERVER_IMAGES}/${user.profile}`}
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-center md:justify-start items-start md:text-left">
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-medium">{user.fullname}</h1>
                    <h3 className="font-normal text-foreground/80">
                      {user.email}
                    </h3>
                    <p className="text-sm font-light my-2 text-foreground/60">
                      Created {user.events?.length || 0} events
                    </p>
                    <Button
                      className="rounded-md"
                      color="danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
