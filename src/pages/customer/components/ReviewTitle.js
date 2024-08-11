import React from "react";

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;

  return `${day}${getOrdinalSuffix(
    day
  )} ${month} ${year}, ${formattedHours}:${formattedMinutes}${ampm}`;
}

function ReviewTitle({ review }) {
  return (
    <div className="flex justify-between items-start w-full px-4 py-2">
      <div className="text-left">
        <div className="text-md font-bold">{review.user_name}</div>
        <div className="text-sm">{formatDate(review.created_at)}</div>
      </div>
      <div className="text-sm bg-white rounded-lg px-4 py-2 text-black font-bold">
        {review.rating}
      </div>
    </div>
  );
}

export default ReviewTitle;
