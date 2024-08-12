import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOrderContext } from "../../context/orderContext";

export default function MyOrders() {
  // State
  const [orders, setOrders] = useState([]);

  // Contexts
  const { getOrdersByUserId } = useOrderContext();

  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const statusId = searchParams.get("status");

  // Functions
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrdersByUserId(statusId);
      console.log(response);
      setOrders(response);
    };
    fetchOrders();
    // eslint-disable-next-line
  }, [statusId]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4 text-white">
      <div className="flex space-x-4">
        <div
          onClick={() => setSearchParams({ status: "all" })}
          className={`${
            statusId === "all" ? "font-bold bg-purple-700" : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          All
        </div>
        <div
          onClick={() => setSearchParams({ status: 1 })}
          className={`${
            parseInt(statusId) === 1
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Pending
        </div>
        <div
          onClick={() => setSearchParams({ status: 2 })}
          className={`${
            parseInt(statusId) === 2
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Processing
        </div>
        <div
          onClick={() => setSearchParams({ status: 3 })}
          className={`${
            parseInt(statusId) === 3
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Shipped
        </div>
        <div
          onClick={() => setSearchParams({ status: 4 })}
          className={`${
            parseInt(statusId) === 4
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Delivered
        </div>
        <div
          onClick={() => setSearchParams({ status: 5 })}
          className={`${
            parseInt(statusId) === 5
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Completed
        </div>
        <div
          onClick={() => setSearchParams({ status: 6 })}
          className={`${
            parseInt(statusId) === 6
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Cancelled
        </div>
        <div
          onClick={() => setSearchParams({ status: 7 })}
          className={`${
            parseInt(statusId) === 7
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Returned
        </div>
        <div
          onClick={() => setSearchParams({ status: 8 })}
          className={`${
            parseInt(statusId) === 8
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Refunded
        </div>
        <div
          onClick={() => setSearchParams({ status: 9 })}
          className={`${
            parseInt(statusId) === 9
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Failed
        </div>
      </div>
      <div className="flex-1 overflow-y-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-200">
          <thead className="text-xs uppercase bg-gray-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((value, index) => (
              <tr
                key={value.id}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-gray-100 dark:bg-gray-900"
                } border-b border-gray-300 dark:border-gray-700`}
              >
                <td className="px-6 py-4">{value.id}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col space-y-4">
                    {value.items.map((item, idx) => (
                      <div className="flex space-x-4" key={idx}>
                        <img
                          src={`http://localhost:3000${item.book.image_url}`}
                          alt={item.book.title}
                          className="object-cover h-32 w-24 rounded-lg"
                        />
                        <div className="flex flex-col space-y-2">
                          <div className="text-md">{item.book.title}</div>
                          <div className="text-md">by {item.book.author}</div>
                          <div className="text-md">${item.price}</div>
                          <div className="text-md">x{item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">${value.totalPrice}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-purple-700 text-white">
                    {value.status.label.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
