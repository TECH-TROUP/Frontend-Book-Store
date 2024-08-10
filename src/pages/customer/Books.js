import React, { useEffect, useState } from "react";
import { useBookContext } from "../../context/bookContext";
import { useWishlistContext } from "../../context/wishlistContext";
import { useUserContext } from "../../context/userContext";
import { useCartContext } from "../../context/cartContext";
import BookElement from "../../components/BookElement";
import { LoginModal } from "../../components/LoginModal";
import Snackbar from "../../components/Snackbar";

export default function Books() {
  // State
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  // Context
  const { user } = useUserContext();
  const { getBooksByStatusId } = useBookContext();
  const { cart, addToCart, removeFromCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  //   Functions
  useEffect(() => {
    initializeData();
    // eslint-disable-next-line
  }, []);

  const initializeData = async () => {
    const response = await getBooksByStatusId(2);
    setBooks(response);
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
      {loading ? (
        <div></div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-140px)] space-y-4 text-white p-6 overflow-y-auto">
          <div className="grid grid-cols-6 gap-4 text-white">
            {books.map((book, idx) => (
              <BookElement
                key={idx}
                value={book}
                onWishlistChange={toggleWishlist}
                onCartChange={handleCartChange}
                isBookInWishlist={isBookInWishlist(book.id)}
                isBookInCart={isBookInCart(book.id)}
                direction="col"
                spacing="2"
                imageDimensions={{ height: 20, width: 14 }}
              />
            ))}
          </div>
        </div>
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
