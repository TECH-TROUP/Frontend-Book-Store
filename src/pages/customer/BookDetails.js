import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../../context/bookContext";
import { icons } from "../../assets/icons/IconData";
import { useCartContext } from "../../context/cartContext";
import { useWishlistContext } from "../../context/wishlistContext";
import { useUserContext } from "../../context/userContext";
import { LoginModal } from "../../components/LoginModal";
import Snackbar from "../../components/Snackbar";
import ReviewsSection from "./components/ReviewsSection";

export default function BookDetails() {
  // state
  const [book, setBook] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  // context
  const { bookId } = useParams();
  const { user } = useUserContext();
  const { getBookById } = useBookContext();
  const { addToCart, cart, removeFromCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const response = await getBookById(bookId);
    setBook(response);
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

  const showSnackbar = (message, bgColor) => {
    setSnackbarMessage({ message, bgColor });
    setIsSnackbarVisible(true);
  };

  const isBookInWishlist = (bookId) => {
    return wishlist.includes(bookId);
  };

  const isBookInCart = (bookId) => {
    return cart.includes(bookId);
  };

  return book ? (
    <>
      <div className="text-white flex flex-col h-[calc(100vh-150px)] space-y-4 px-80 flex-1 overflow-y-auto">
        <div className="flex space-x-4">
          <div className="w-3/12">
            {book.image_url ? (
              <img
                src={`http://localhost:3000${book.image_url}`}
                alt={book.title}
                className={`object-cover rounded-lg cursor-pointer w-80`}
              />
            ) : (
              <div className="bg-slate-300 h-32 w-24 rounded-lg flex items-center justify-center">
                <div className="font-bold rounded-full bg-red-900 p-2">
                  {icons.exclamation}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4 flex flex-col items-start bg-sky-900/70 w-9/12 rounded-xl px-4 py-2">
            <div className="text-5xl font-bold">{book.title}</div>
            <div className="text-xl text-left">by {book.author}</div>
            <div className="text-xl text-left font-bold">{book.price}$</div>
            <div className="text-xl text-left">{book.category_name}</div>
            <div className="text-xl text-left">
              {book.purchase_count} people bought this book
            </div>
            <button
              onClick={() => handleCartChange(book.id)}
              className={`p-2 rounded-xl transition-color duration-300 flex ${
                isBookInCart(book.id)
                  ? "bg-green-600 hover:bg-green-800"
                  : "bg-blue-600 hover:bg-blue-900"
              }`}
            >
              {icons.shopping_cart}&nbsp;&nbsp;
              {isBookInCart(book.id) ? "In Cart" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWishlist(book.id)}
              className={`font-bold  p-2 rounded-xl  transition-color duration-300 flex ${
                isBookInWishlist(book.id)
                  ? "bg-pink-800 text-white hover:text-black hover:bg-purple-300"
                  : "bg-purple-300 text-black hover:text-white hover:bg-pink-800"
              }`}
            >
              {isBookInWishlist(book.id) ? icons.heart_red : icons.heart}
              &nbsp;&nbsp;
              {isBookInWishlist(book.id) ? "In Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
        <div className="text-left text-xl font-bold">Description</div>
        <div className="bg-indigo-950/80 p-4 rounded-lg text-left">
          {book.description}
        </div>
        <div className="text-left text-xl font-bold">Reviews</div>
        <ReviewsSection
          bookId={book.id}
          averageRating={book.rating_average}
          reviewCount={book.review_count}
        />
      </div>
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
  ) : (
    <div>Loading</div>
  );
}
