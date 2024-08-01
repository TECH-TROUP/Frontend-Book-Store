import React from "react";
import Logo from "../assets/images/logo.png";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { icons } from "../assets/icons/IconData";

export default function NavBar() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-row items-center text-white justify-between">
      <div className="flex flex-row items-center w-1/5 space-x-10">
        <img src={Logo} alt="Logo" className="rounded-full w-12 h-12" />
        <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
          BOOK NEST
        </h2>
      </div>
      <div className="w-1/5 flex rounded-2xl bg-white px-4 py-1.5 text-black">
        <input className="w-full outline-none" placeholder="Search" />
        {icons.search}
      </div>
      <div className="flex flex-row items-center w-2/5 justify-center space-x-20 text-lg">
        <div className="cursor-pointer">Home</div>
        <div className="cursor-pointer">Books</div>
        <div className="cursor-pointer">Rentals</div>
      </div>

      <div className="w-1/5 flex justify-end" onClick={handleAuth}>
        <button className="shadow-black border-slate-500 rounded-3xl p-1 border-2 w-1/3 hover:bg-purple-950 hover:border-purple-950">
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}
