import React, { useState } from "react";
import Login_bg from "../images/login.jpg";
import Logo from "../images/logo.jpg";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signInUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { username, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);

      // Navigate to home
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center brightness-75"
      style={{ backgroundImage: `url(${Login_bg})` }}
    >
      <div className="bg-neutral-200 p-8 rounded-lg flex flex-col justify-center items-center w-1/4">
        <img src={Logo} alt="Logo" className="rounded-full w-24 h-24" />
        <div className="my-6 text-2xl font-bold">LOGIN</div>
        <form onSubmit={signInUser}>
          <CustomInput
            placeholder="Username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <CustomInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="bg-zinc-700 rounded-full px-4 py-2 text-white mt-7 w-1/3"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-3">
          <div className="border-b w-16 border-white" />
          <div className="mx-4">OR</div>
          <div className="border-b w-16 border-black" />
        </div>

        <p>
          New user?{" "}
          <a href="register" className="text-blue-600">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
