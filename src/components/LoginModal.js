import { useNavigate } from "react-router-dom";

export const LoginModal = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="mb-4">
          Please log in to add items to your wishlist or cart.
        </p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => onClose()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
