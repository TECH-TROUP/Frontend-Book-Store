import React from "react";

export default function CustomInput({ placeholder, type, value, onChange }) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className="bg-gray-500 px-4 py-2 rounded-full text-white placeholder-white focus:bg-yellow-900 focus:outline-none mb-3 w-full"
    />
  );
}
