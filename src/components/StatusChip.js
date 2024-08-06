import React from "react";

export default function StatusChip({ id, label }) {
  return (
    <div
      className={`font-bold tracking-widest p-2 rounded-xl text-center text-black ${
        id === 1
          ? "bg-yellow-300"
          : id === 2
          ? "bg-green-300"
          : id === 3
          ? "bg-red-300"
          : id === 4
          ? "bg-green-500"
          : id === 5
          ? "bg-green-500"
          : id === 6
          ? "bg-blue-300"
          : id === 7
          ? "bg-orange-300"
          : id === 8
          ? "bg-teal-300"
          : id === 9
          ? "bg-red-500"
          : id === 10
          ? "bg-gray-500"
          : id === 11
          ? "bg-yellow-500"
          : "bg-gray-500"
      }`}
    >
      {label.toUpperCase()}
    </div>
  );
}
