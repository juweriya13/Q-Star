import React from "react";
import { Button } from "@nextui-org/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero-section px-10">
      <section className="py-10 sm:py-16 lg:py-24 text-white cursor-default">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="relative inline-flex">
                <h1 className="relative text-4xl font-bold sm:text-5xl lg:text-6xl select-none ">
                  CampusEventHub
                </h1>
              </div>

              <p className="mt-8 text-light text-zinc-400 sm:text-xl select-none">
                Discover and join exciting college events effortlessly with
                CampusEventHub – your gateway to endless opportunities and
                unforgettable experiences!
              </p>

              <div className="mt-10 sm:flex sm:items-center">
                  <Button
                    variant="shadow"
                    color="secondary"
                    className="mr-2 bg-gradient-to-r from-fuchsia-600 to-blue-600"
                    onClick={() => navigate('/events')}
                  >
                    Events
                  </Button>
                  <Button
                    variant="shadow"
                    color="secondary"
                    className="bg-gradient-to-r to-fuchsia-600 from-blue-600"
                    onClick={() => navigate('/create')}
                  >
                    Create
                  </Button>
              </div>
            </div>

            <div className="bg-zinc-900">
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
