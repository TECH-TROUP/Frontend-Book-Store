import React, { useState, useEffect } from "react";

export default function Snackbar({ data, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 ${
        data.bgColor
      } text-white p-4 rounded-lg transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      }`}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      {data.message}
    </div>
  );
}
