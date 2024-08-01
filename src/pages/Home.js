import React from "react";
import { useUserContext } from "../context/userContext";
import NavBar from "../components/NavBar";

export default function Home() {
  const { user, logout } = useUserContext();
  return (
    <div>
      Home
      <button onClick={logout}>Logout</button>
    </div>
  );
}
