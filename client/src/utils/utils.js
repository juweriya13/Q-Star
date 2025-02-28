export const convertTo12HourFormat = (timeString) => {
  // Split the time string into hours and minutes
  const [hourString, minuteString] = timeString.split(":");

  // Convert to integers
  let hour = parseInt(hourString, 10);
  let minute = parseInt(minuteString, 10);

  // Determine the period (AM/PM)
  let period = "AM";
  if (hour >= 12) {
    period = "PM";
    hour = hour === 12 ? 12 : hour - 12;
  } else {
    hour = hour === 0 ? 12 : hour;
  }

  // Pad minutes with leading zero if needed
  const minuteFormatted = minute < 10 ? `0${minute}` : minute;

  return `${hour}:${minuteFormatted} ${period}`;
};

export const formatTime = (hour, minute) => {
  const period = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12; // Converts 0 to 12
  const formattedMinute = minute.toString().padStart(2, "0"); // Pads single digit minutes with a leading zero
  return `${adjustedHour}:${formattedMinute} ${period}`;
};


export const parseTime = (timeString) => {
  const [time, period] = timeString.split(' ');
  let [hour, minute] = time.split(':').map(Number);

  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  return { hour, minute };
};
