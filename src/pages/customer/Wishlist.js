import React, { useEffect, useState } from "react";
import { useWishlistContext } from "../../context/wishlistContext";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons/IconData";
import { useUserContext } from "../../context/userContext";
import { useCartContext } from "../../context/cartContext";

export default function Wishlist() {
  // state
  const [wishlistDetailed, setWishlistDetailed] = useState([]);
  const [loading, setLoading] = useState(true);

  // context
  const { wishlist, fetchUserWishlist, addToWishlist, removeFromWishlist } =
    useWishlistContext();
  const { cart, addToCart, removeFromCart } = useCartContext();
  const navigate = useNavigate();

  // functions
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const response = await fetchUserWishlist();
    setWishlistDetailed(response);
    setLoading(false);
  };

  const toggleWishlist = async (bookId) => {
    if (isBookInWishlist(bookId)) {
      await removeFromWishlist(bookId);
      await initializeData();
    }
  };

  const isBookInWishlist = (bookId) => {
    return wishlist.includes(bookId);
  };

  const isBookInCart = (bookId) => {
    return cart.includes(bookId);
  };

  const handleCartChange = async (bookId) => {
    if (isBookInCart(bookId)) {
      await removeFromCart(bookId);
    } else {
      await addToCart(bookId, 1, "sale");
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-8 items-start">
      <div className="text-3xl">Wishlist</div>
      <div className="border-b w-full border-slate-600" />
      <div className="grid grid-cols-5 gap-10 w-full flex-1 overflow-y-auto">
        {wishlistDetailed.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="bg-gradient-to-r from-blue-800/40 to-purple-600/40 rounded-xl flex flex-col space-y-2 items-center pt-4 relative">
              {/* Remove Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(item.id)}
                className="absolute top-2 right-2 bg-white text-white p-1 rounded-full hover:bg-yellow-400 transition-colors duration-300"
              >
                {icons.heart_red}
              </button>
              {/* Content */}
              <img
                src={`http://localhost:3000${item.image_url}`}
                alt={item.title}
                onClick={() => navigate(`/books/${item.id}`)}
                className={`object-cover rounded-lg cursor-pointer w-52`}
              />
              <div>
                <div className="text-lg font-bold">{item.title}</div>
                <div className="text-sm">by {item.author}</div>
              </div>
              <div className="text-md">Genre: {item.category_name}</div>
              <div className="text-lg font-bold">{item.price}$</div>
              <button
                onClick={() => handleCartChange(item.id)}
                className={`rounded-lg p-2 w-full  transition-color duration-300 flex justify-center ${
                  isBookInCart(item.id)
                    ? "bg-green-700 hover:bg-green-500"
                    : "bg-black hover:bg-blue-700"
                }`}
              >
                {isBookInCart(item.id) ? "In Cart" : "Add to Cart"} &nbsp;&nbsp;
                {icons.shopping_cart}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
