import React from "react";
import { Transition } from "@headlessui/react";
import { icons } from "../assets/icons/IconData";

const FullScreenModal = ({ isOpen, onClose, children }) => {
  return (
    <Transition show={isOpen} as="div">
      <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-75">
        <div className="flex items-center justify-center h-full">
          <div className="relative bg-purple-950 w-full h-full max-w-full max-h-full p-8">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              {icons.close}
            </button>
            {children}
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default FullScreenModal;
