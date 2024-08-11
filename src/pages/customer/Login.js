import React, { useState } from "react";
import Login_bg from "../../assets/images/login_bg.jpg";
import Logo from "../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput";
import { useUserContext } from "../../context/userContext";
import { icons } from "../../assets/icons/IconData";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useUserContext();
  const navigate = useNavigate();

  const signInUser = async (event) => {
    event.preventDefault();
    const response = await login(username, password);
    if (response && response.error) {
      setError(response.error);
    } else {
      setError(null);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center brightness-75"
      style={{ backgroundImage: `url(${Login_bg})` }}
    >
      <div className="bg-neutral-200 p-8 rounded-lg flex flex-col justify-center items-center w-1/4">
        <img src={Logo} alt="Logo" className="rounded-full w-24 h-24" />
        <div className="my-6 text-2xl font-bold text-black">LOGIN</div>
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
          <div className="mx-4 text-black">OR</div>
          <div className="border-b w-16 border-black" />
        </div>

        <p className="text-black">
          New user?{" "}
          <a href="register" className="text-blue-600">
            Create an account
          </a>
        </p>

        <div className="flex items-center my-3">
          <div className="border-b w-44 border-slate-500" />
        </div>

        <div
          className="text-blue-900 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Continue as guest!
        </div>

        {error && (
          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="flex items-center my-3">
              <div className="border-b w-44 border-black" />
            </div>
            <div className="text-white px-4 py-2 bg-red-500 rounded-xl text-sm flex w-full justify-between">
              <div>{error}</div>
              <div className="cursor-pointer" onClick={() => setError(null)}>
                {icons.close}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
