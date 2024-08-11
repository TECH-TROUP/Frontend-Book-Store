import React, { useEffect, useState } from "react";
import { useCartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons/IconData";

export default function Cart() {
  // State
  const [cartDetailed, setCartDetailed] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  // context
  const { fetchUserCart, addToCart, updateQuantityInCart, removeFromCart } =
    useCartContext();
  const navigate = useNavigate();

  // functions
  useEffect(() => {
    initializeData();
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

  return loading ? (
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
            <button className="bg-black rounded-3xl w-full py-2 hover:bg-green-700 transition-color duration-300 font-bold">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
