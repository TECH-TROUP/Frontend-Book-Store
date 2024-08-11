import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const shouldApplyPadding = pathname !== "/login" && pathname !== "/register";

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-r from-purple-950 to-black space-y-6 text-white ${
        shouldApplyPadding ? "p-8" : ""
      } font-poiret`}
    >
      {shouldApplyPadding && <NavBar />}
      <div className="h-screen">{children}</div>
    </div>
  );
};

export default Layout;
