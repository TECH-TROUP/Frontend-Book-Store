import React, { useEffect, useState } from "react";
import { useCartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons/IconData";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import authService from "../../authentication/authService";
import { useUserContext } from "../../context/userContext";
import Snackbar from "../../components/Snackbar";

export default function Cart() {
  // State
  const [cartDetailed, setCartDetailed] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  // context
  const {
    fetchCart,
    fetchUserCart,
    addToCart,
    updateQuantityInCart,
    removeFromCart,
  } = useCartContext();
  const { user, updateAddress } = useUserContext();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // functions
  useEffect(() => {
    initializeData();
    // eslint-disable-next-line
  }, []);

  const initializeData = async () => {
    const response = await fetchUserCart();
    setCartDetailed(response);
    calculateTotalPrice(response);
    setLoading(false);
  };

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  const increaseItemQuantity = async (bookId) => {
    await addToCart(bookId, 1, "sale");
    initializeData();
  };

  const reduceItemQuantity = async (bookId, currentQuantity) => {
    if (currentQuantity !== 1) {
      await updateQuantityInCart(bookId, currentQuantity - 1);
    } else {
      await removeFromCart(bookId);
    }
    initializeData();
  };

  const removeItemFromCart = async (bookId) => {
    await removeFromCart(bookId);
    initializeData();
  };

  const handleCheckboxChange = (bookId) => {
    if (selectedItems.includes(bookId)) {
      setSelectedItems(selectedItems.filter((id) => id !== bookId));
    } else {
      setSelectedItems([...selectedItems, bookId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartDetailed.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartDetailed.map((item) => item.id));
    }
  };

  const handleBuyNow = async () => {
    setPaymentError("");
    if (cartDetailed.length === 0) {
      showSnackbar("Your cart is empty", "bg-yellow-700");
      return;
    }

    if (user.address) {
      setPaymentLoading(true);
      try {
        // Create payment intent
        const response = await axios.post(
          "http://localhost:3000/api/create-payment-intent",
          { amount: totalPrice * 100 },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const clientSecret = response.data.clientSecret;

        // Use Stripe.js to handle the payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: "Your Name",
              },
            },
          }
        );
        if (error) {
          console.error("Payment failed:", error);
          setPaymentError(error.message);
        } else if (paymentIntent.status === "succeeded") {
          const response = await axios.post(
            "http://localhost:3000/api/orders",
            {},
            authService.getAuthHeader()
          );

          if (response.data.success) {
            // Navigate to order confirmation page
            await fetchCart();
            navigate(`/order-confirmation/${response.data.orderId}`);
          }
        }
      } catch (error) {
        console.error("Error handling payment:", error);
        alert("An error occurred. Please try again.");
      }
      setPaymentLoading(false);
    } else {
      showSnackbar("Please add a valid delivery address", "bg-yellow-700");
      // Ask user to provide address
    }
  };

  const updateUserAddress = async () => {
    await updateAddress(address);
    setAddress("");
  };

  const showSnackbar = (message, bgColor) => {
    setSnackbarMessage({ message, bgColor });
    setIsSnackbarVisible(true);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col space-y-4 items-start">
          <div className="text-3xl font-bold">My Cart</div>
          <div className="flex space-x-4 w-full">
            <div className="w-3/4 flex flex-col h-[calc(100vh-200px)] space-y-6">
              <div className="w-full border border-white/30 rounded-lg flex justify-between items-center py-3 px-4">
                <div className="flex space-x-4 items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedItems.length === cartDetailed.length}
                    onChange={handleSelectAll}
                  />
                  <div>Select All</div>
                </div>
                <div>
                  <button
                    onClick={() => selectedItems.forEach(removeItemFromCart)}
                    className="bg-black rounded-3xl py-2 px-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-6 flex-1 overflow-y-auto">
                {cartDetailed.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full border border-white/30 rounded-lg flex px-4 py-3 justify-between items-center"
                  >
                    <div className="flex items-start space-x-6">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <img
                        src={`http://localhost:3000${item.image_url}`}
                        alt={item.title}
                        onClick={() => navigate(`/books/${item.id}`)}
                        className={`object-cover rounded-lg cursor-pointer w-20`}
                      />
                      <div className="flex flex-col space-y-2 items-start">
                        <div className="border border-white/30 rounded-3xl px-3 py-1">
                          {item.category_name}
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="text-lg font-bold">{item.title}</div>
                          <div className="text-sm">by {item.author}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col self-end items-end space-y-4">
                      <div className="text-lg font-bold">
                        ${item.price * item.quantity}
                      </div>
                      <div className="flex space-x-4 items-center">
                        <button
                          onClick={() => removeItemFromCart(item.id)}
                          className="bg-white/30 text-white rounded-3xl p-1 hover:bg-white/10 transition-color duration-300"
                        >
                          {icons.trash}
                        </button>
                        <div className="border border-white/30 rounded-lg bg-white/30 px-4 py-1 flex space-x-8">
                          <button
                            onClick={() =>
                              reduceItemQuantity(item.id, item.quantity)
                            }
                            className="hover:bg-white/10 rounded-3xl transition-color duration-300"
                          >
                            {icons.minus}
                          </button>
                          <div>{item.quantity}</div>
                          <button
                            onClick={() => increaseItemQuantity(item.id)}
                            className="hover:bg-white/10 rounded-3xl transition-color duration-300"
                          >
                            {icons.plus}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/4">
              <div className="w-full border border-white/30 bg-white/30 rounded-lg flex flex-col items-start py-3 px-4 space-y-4">
                <div className="font-bold">Summary Order</div>
                <div className="flex justify-between w-full items-center">
                  <div className="text-md">Subtotal:</div>
                  <div className="font-bold text-xl">{totalPrice}</div>
                </div>
                <div className="flex w-full space-x-4">
                  <input
                    className="rounded-lg p-2 outline-none w-full text-black"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                  />
                  <button
                    onClick={updateUserAddress}
                    className="bg-green-700 rounded-lg px-4 hover:bg-green-500 transition-color duration-300"
                  >
                    Save
                  </button>
                </div>
                {user.address && (
                  <div className="flex items-center w-full space-x-2">
                    <div className="bg-indigo-900 rounded-lg p-2">Address</div>
                    <div className="bg-indigo-700 rounded-lg p-2 font-bold w-full">
                      {user.address}
                    </div>
                  </div>
                )}
                <div className="w-full space-y-4">
                  <CardElement className="border border-white/30 rounded-lg px-4 py-2 bg-white" />
                  {paymentError !== "" && (
                    <div className="bg-red-600 rounded-3xl p-2 flex items-center space-x-2">
                      <div> {icons.exclamation}</div>
                      <div>{paymentError}</div>
                    </div>
                  )}
                  <button
                    onClick={handleBuyNow}
                    disabled={paymentLoading}
                    className="bg-black rounded-3xl w-full py-2 hover:bg-green-700 transition-color duration-300 font-bold flex justify-center items-center active:bg-black"
                  >
                    <div>Buy Now</div>
                    {paymentLoading && (
                      <div className="ml-8">{icons.loading}</div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        data={snackbarMessage}
        isVisible={isSnackbarVisible}
        onClose={() => setIsSnackbarVisible(false)}
      />
    </>
  );
}
