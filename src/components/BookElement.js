import React, { useEffect } from "react";
import { icons } from "../assets/icons/IconData";
import { useNavigate } from "react-router-dom";

export default function BookElement({
  value,
  onWishlistChange,
  onCartChange,
  isBookInWishlist,
  isBookInCart,
  spacing,
  direction,
  imageDimensions,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(value);
  }, []);

  return value.image_url ? (
    <div
      className={`flex flex-${direction} space-${
        direction === "row" ? "x" : "y"
      }-${spacing}`}
    >
      <img
        src={`http://localhost:3000${value.image_url}`}
        alt={value.title}
        style={{
          width: `${imageDimensions.width}rem`,
          height: `${imageDimensions.height}rem`,
        }}
        onClick={() => navigate(`/books/${value.id}`)}
        className={`object-cover rounded-lg cursor-pointer`}
      />
      <div className="flex flex-col space-y-4 justify-center items-start text-left">
        <div className="max-w-40">
          <div className="text-lg font-bold">{value.title}</div>
          <div className="text-sm">by {value.author}</div>
        </div>
        <div className="text-lg font-bold bg-purple-400/20 rounded-lg px-2">
          {value.price}$
        </div>
        <div className="flex space-x-4">
          <div
            className="cursor-pointer"
            onClick={() => onWishlistChange(value.id)}
          >
            {isBookInWishlist ? icons.heart_red : icons.heart}
          </div>
          {value.stock > 0 && (
            <div
              className="cursor-pointer"
              onClick={() => onCartChange(value.id)}
            >
              {isBookInCart ? icons.check_circle : icons.shopping_cart}
            </div>
          )}
          <div className="cursor-pointer">
            {value.stock_rent > 0 && icons.currency_dollar}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-slate-300 h-32 w-24 rounded-lg flex items-center justify-center">
      <div className="font-bold rounded-full bg-red-900 p-2">
        {icons.exclamation}
      </div>
    </div>
  );
}
