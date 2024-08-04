import React from "react";
import { useUserContext } from "../../context/userContext";

export default function Home() {
  const { user } = useUserContext();
  return user ? (
    <div className="text-white text-3xl">Welcome {user.name}</div>
  ) : (
    <div></div>
  );
}
