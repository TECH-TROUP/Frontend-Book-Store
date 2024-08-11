import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { useBookContext } from "../../context/bookContext";
import { icons } from "../../assets/icons/IconData";
import HomeBg from "../../assets/images/home_bg.jpg";
import { LoginModal } from "../../components/LoginModal";
import { useWishlistContext } from "../../context/wishlistContext";
import { useCartContext } from "../../context/cartContext";
import Snackbar from "../../components/Snackbar";
import BookElement from "../../components/BookElement";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // State
  const [bestSellers, setBestSellers] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  // context
  const { user } = useUserContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();
  const { cart, addToCart, removeFromCart } = useCartContext();
  const { getBooksPublicQuery } = useBookContext();
  const navigate = useNavigate();

  useEffect(() => {
    initializeData();
    // eslint-disable-next-line
  }, []);

  const initializeData = async () => {
    const responseBest = await getBooksPublicQuery("top5");
    setBestSellers(responseBest);

    const responseTop = await getBooksPublicQuery("top-rated?limit=3");
    setTopRated(responseTop);
    setLoading(false);
  };

  const toggleWishlist = async (bookId) => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      if (isBookInWishlist(bookId)) {
        await removeFromWishlist(bookId);
        showSnackbar("Book removed from wishlist!", "bg-yellow-700");
      } else {
        await addToWishlist(bookId);
        showSnackbar("Book added to wishlist!", "bg-green-700");
      }
    }
  };

  const handleCartChange = async (bookId) => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      if (isBookInCart(bookId)) {
        await removeFromCart(bookId);
        showSnackbar("Book removed from cart!", "bg-yellow-700");
      } else {
        await addToCart(bookId, 1, "sale");
        showSnackbar("Book added to cart!", "bg-green-700");
      }
    }
  };

  const isBookInWishlist = (bookId) => {
    return wishlist.includes(bookId);
  };

  const isBookInCart = (bookId) => {
    return cart.includes(bookId);
  };

  const showSnackbar = (message, bgColor) => {
    setSnackbarMessage({ message, bgColor });
    setIsSnackbarVisible(true);
  };

  return (
    <>
      {!loading ? (
        <div className="text-white flex flex-col space-y-6">
          <div className="relative">
            <img
              src={HomeBg}
              alt="background"
              className="rounded-2xl max-h-[500px] w-full object-cover brightness-50"
            />

            {/* Text on the left side */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-7xl font-bold w-1/2 flex justify-center items-center">
              <div className="w-2/3 tracking-wider ">
                Discover your next great read: Rent, Enjoy and Return with ease!
              </div>
            </div>

            {/* Images on the right side */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 flex items-center justify-center">
              <div className="flex flex-row space-x-8">
                {topRated.map((book, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:3000${book.image_url}`}
                    alt={book.title}
                    className={`object-cover h-72 w-48 rounded-lg hover:w-56 hover:h-80 transition-all duration-300 cursor-pointer`}
                    onClick={() => navigate(`/books/${book.id}`)}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Best Selling Books */}
          <div className="flex flex-col space-y-4">
            <div className="text-3xl w-2/6 flex justify-start items-center">
              BESTSELLERS
            </div>
            <div className="flex space-x-2 justify-center items-center bg-purple-400/10 rounded-xl p-6 w-full">
              {bestSellers.map((book, idx) => (
                <div key={idx} className="relative w-1/5">
                  <div className="absolute top-0 left-0 p-2 text-white font-bold text-xl bg-black bg-opacity-60 rounded-br-lg">
                    {`0${idx + 1}`}
                  </div>
                  <BookElement
                    key={idx}
                    value={book}
                    onWishlistChange={toggleWishlist}
                    onCartChange={handleCartChange}
                    isBookInWishlist={isBookInWishlist(book.id)}
                    isBookInCart={isBookInCart(book.id)}
                    direction="row"
                    spacing="2"
                    imageDimensions={{ height: 13, width: 9 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <LoginModal
        isVisible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <Snackbar
        data={snackbarMessage}
        isVisible={isSnackbarVisible}
        onClose={() => setIsSnackbarVisible(false)}
      />
    </>
  );
}
