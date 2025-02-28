import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
function EventCard({
  title,
  image,
  startDate,
  startTime,
  location,
  entryFee,
  id,
}) {
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <Card className="flex flex-col h-full py-4">
        <CardHeader className="pb-2 pt-0 px-3">
          <div className="overflow-hidden rounded-md object-cover w-full aspect-square">
            <img
              loading="lazy"
              alt="Card background"
              className="object-cover w-full h-full cursor-pointer"
              src={image}
              onClick={() => navigate(`/event/${id}`)}
            />
          </div>
        </CardHeader>
        <CardBody className="flex flex-col flex-grow py-2">
          <h4 className="font-bold text-large">{title}</h4>
          <div className="flex justify-between flex-wrap mt-1">
            <small className="text-default-500 flex gap-1 items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar-check"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="m9 16 2 2 4-4" />
              </svg>
              {startDate}
            </small>
            <small className="text-default-500 flex gap-1 items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {startTime}
            </small>
          </div>
          <small className="text-default-500 my-1 flex gap-1 items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </small>
          <h4 className="font-bold text-large mt-auto">
            {entryFee === "Free" ? <>{entryFee}</> : <>Rs. {entryFee}</>}
          </h4>
        </CardBody>
      </Card>
    </div>
  );
}

export default EventCard;
