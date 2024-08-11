import React from "react";
import Logo from "../assets/images/logo.png";
import { useUserContext } from "../context/userContext";
import { useCartContext } from "../context/cartContext";
import { useWishlistContext } from "../context/wishlistContext";
import { useLocation, useNavigate } from "react-router-dom";
import { icons } from "../assets/icons/IconData";

const adminMenu = [
  { label: "Home", url: "/admin/home" },
  { label: "Books", url: "/admin/books?status=1" },
  { label: "Users", url: "/admin/users?role=2" },
  { label: "Orders", url: "/admin/orders" },
  { label: "Reviews", url: "/admin/reviews" },
  { label: "Categories", url: "/admin/categories" },
];

const customerMenu = [
  { label: "Home", url: "/home" },
  { label: "Books", url: "/books" },
];

const vendorMenu = [
  { label: "Home", url: "/vendor/home" },
  { label: "Books", url: "/vendor/books" },
];

const Badge = ({ number }) => (
  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
    {number}
  </div>
);

export default function NavBar() {
  const { user, logout } = useUserContext();
  const { cart } = useCartContext();
  const { wishlist } = useWishlistContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleAuth = () => {
    if (user) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-row items-center text-white justify-between">
      <div
        onClick={() => navigate("/home")}
        className="flex flex-row items-center w-1/5 space-x-10 cursor-pointer"
      >
        <img src={Logo} alt="Logo" className="rounded-full w-12 h-12 " />
        <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight ">
          BOOK NEST
        </h2>
      </div>
      {!pathname.includes("/admin") && !pathname.includes("/vendor") && (
        <div className="w-1/5 flex rounded-2xl bg-white px-4 py-1.5 text-black">
          <input className="w-full outline-none" placeholder="Search" />
          {icons.search}
        </div>
      )}
      <div className="flex flex-row items-center w-2/5 justify-center space-x-20 text-lg">
        {pathname.includes("/admin")
          ? adminMenu.map((menu, idx) => (
              <div
                key={idx}
                className={`cursor-pointer py-1 px-4 ${
                  pathname === menu.url &&
                  "bg-purple-300/10 rounded-lg font-bold"
                }`}
                onClick={() => navigate(menu.url)}
              >
                {menu.label}
              </div>
            ))
          : pathname.includes("/vendor")
          ? vendorMenu.map((menu, idx) => (
              <div
                key={idx}
                className={`cursor-pointer py-1 px-4 ${
                  pathname === menu.url &&
                  "bg-purple-300/10 rounded-lg font-bold"
                }`}
                onClick={() => navigate(menu.url)}
              >
                {menu.label}
              </div>
            ))
          : customerMenu.map((menu, idx) => (
              <div
                key={idx}
                className={`cursor-pointer py-1 px-4 ${
                  pathname === menu.url &&
                  "bg-purple-300/10 rounded-lg font-bold"
                }`}
                onClick={() => navigate(menu.url)}
              >
                {menu.label}
              </div>
            ))}
      </div>
      <div className="w-1/5 flex justify-end items-center space-x-8">
        <div className="relative inline-flex items-center space-x-8">
          {user && (
            <>
              <div
                className={`cursor-pointer py-1 px-2 ${
                  pathname === "/my-orders" &&
                  "bg-purple-300/10 rounded-lg font-bold"
                }`}
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </div>
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/wishlist")}
              >
                {icons.heart}
                {wishlist.length > 0 && <Badge number={wishlist.length} />}
              </div>
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                {icons.shopping_cart}
                {cart.length > 0 && <Badge number={cart.length} />}
              </div>
            </>
          )}
        </div>
        <button
          onClick={handleAuth}
          className="shadow-black border-slate-500 rounded-3xl p-1 border-2 w-1/3 hover:bg-purple-950 hover:border-purple-950 transition-colors duration-300"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}
