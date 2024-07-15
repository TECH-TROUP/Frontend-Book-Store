import React, { useState } from "react";
import Login_bg from "../images/login_bg.jpg";
import Logo from "../images/logo.jpg";
import CustomInput from "../components/CustomInput";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        { name, username, password, email }
      );
      console.log(response.data)
    } catch (error) {}
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center brightness-75"
      style={{ backgroundImage: `url(${Login_bg})` }}
    >
      <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center w-1/4">
        <img src={Logo} alt="Logo" className="rounded-full w-24 h-24" />
        <div className="my-6 text-2xl font-bold">SIGN UP</div>
        <form onSubmit={registerUser}>
          <CustomInput
            placeholder="Name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <CustomInput
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
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
            className="bg-zinc-700 rounded-full px-4 py-2 text-white mt-7"
          >
            Create an account
          </button>
        </form>
        <div className="flex items-center my-3">
          <div className="border-b w-16 border-gray" />
          <div className="mx-4">OR</div>
          <div className="border-b w-16 border-black" />
        </div>
        <p>
          Already have an account?{" "}
          <a href="login" className="text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
