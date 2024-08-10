import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { useBookContext } from "../../context/bookContext";
import { icons } from "../../assets/icons/IconData";

export default function Home() {
  // State
  const [bestSellers, setBestSellers] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // context
  const { user } = useUserContext();
  const { getBooksPublicQuery } = useBookContext();

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const responseBest = await getBooksPublicQuery("top5");
    setBestSellers(responseBest);

    const responsePop = await getBooksPublicQuery("popular");
    setPopularBooks(responsePop);
    setLoading(false);
  };

  return !loading ? (
    <div className="text-white flex flex-col space-y-6">
      {/* Best Selling Books */}
      <div className="flex">
        <div className="text-3xl w-2/6 flex justify-center items-center">
          BESTSELLERS
        </div>
        <div className="flex space-x-16 justify-center items-center bg-purple-400/10 rounded-xl p-6 w-full">
          {bestSellers.map((book, idx) => (
            <div key={idx} className="relative">
              <div className="absolute top-0 left-0 p-2 text-white font-bold text-xl bg-black bg-opacity-60 rounded-br-lg">
                {`0${idx + 1}`}
              </div>
              {book.image_url ? (
                <img
                  src={`http://localhost:3000${book.image_url}`}
                  alt={book.title}
                  className="object-cover h-52 w-36 rounded-lg hover:w-44 hover:h-60 transition-all duration-300 cursor-pointer"
                />
              ) : (
                <div className="bg-slate-300 h-32 w-24 rounded-lg flex items-center justify-center">
                  <div className="font-bold rounded-full bg-red-900 p-2">
                    {icons.exclamation}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* popular Books */}
      <div className="flex">
        <div className="flex space-x-16 justify-center items-center">
          {popularBooks.map((book, idx) => (
            <div key={idx} className="relative">
              {book.image_url ? (
                <img
                  src={`http://localhost:3000${book.image_url}`}
                  alt={book.title}
                  className="object-cover h-52 w-36 rounded-lg hover:w-44 hover:h-60 transition-all duration-300 cursor-pointer"
                />
              ) : (
                <div className="bg-slate-300 h-32 w-24 rounded-lg flex items-center justify-center">
                  <div className="font-bold rounded-full bg-red-900 p-2">
                    {icons.exclamation}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
