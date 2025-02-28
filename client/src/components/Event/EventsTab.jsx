import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import axios from "axios";
import EventSkeleton from "./EventSkeleton";

function EventsTab() {
  const [selected, setSelected] = useState("Cultural");
  const [events, setEvents] = useState([]);

  const categories = ["Cultural", "Hackathon", "Competition", "Seminar"];

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/event/allevents`
      );
      response.data.events.reverse();
      setEvents(response.data.events);
      console.log(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [selected]);

  return (
    <div className="min-h-96 my-5  px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex w-full flex-col items-center">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
          color="secondary"
          radius="full"
          size="md"
        >
          {categories.map((category) => (
            <Tab key={category} title={category}>
              <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {events.length > 0 ? (
                  events
                    .filter((event) => event.category.includes(category))
                    .map((event) => (
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
                  <div className="flex w-full gap-3 items-center">
                    <EventSkeleton />
                  </div>
                )}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default EventsTab;
