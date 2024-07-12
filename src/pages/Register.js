import React from "react";
import Login_bg from "../images/login_bg.jpg";
import Logo from "../images/logo.jpg";
import CustomInput from "../components/CustomInput";

export default function Register() {
  const registerUser = () => {};

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center brightness-75"
      style={{ backgroundImage: `url(${Login_bg})` }}
    >
      <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center w-1/4">
        <img src={Logo} alt="Logo" className="rounded-full w-24 h-24" />
        <div className="my-6 text-2xl font-bold">SIGN UP</div>
        <form onSubmit={registerUser}>
          <CustomInput placeholder="Name" type="text" />
          <CustomInput placeholder="Email" type="email" />
          <CustomInput placeholder="Username" type="text" />
          <CustomInput placeholder="Password" type="password" />
          <button
            type="submit"
            className="bg-zinc-700 rounded-full px-4 py-2 text-white mt-7"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}
