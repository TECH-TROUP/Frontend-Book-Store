import React, { useState } from "react";
import FullScreenModal from "../../components/FullScreenModal";

export default function VendorBooks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="text-white flex flex-col space-y-4">
      <button
        onClick={openModal}
        className="p-2 bg-purple-300/10 rounded-lg hover:bg-purple-500/70 transition-colors duration-300"
      >
        Add new Book
      </button>

      <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col space-y-4 items-start ">
          <h1 className="text-2xl font-bold">Add new Book</h1>
          <form>
            <div className="space-y-12"></div>
          </form>
        </div>
      </FullScreenModal>
    </div>
  );
}
