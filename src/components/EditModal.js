import React, { useState, useEffect } from "react";

const EditModal = ({ title, category, onClose, onSubmit, children }) => {
  const [formData, setFormData] = useState(category);

  useEffect(() => {
    setFormData(category);
  }, [category]);



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission to update the category
    onSubmit();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-purple-950 p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-left">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
           {children}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
