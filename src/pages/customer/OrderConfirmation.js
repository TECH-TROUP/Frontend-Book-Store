import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrderContext } from "../../context/orderContext";
import { icons } from "../../assets/icons/IconData";

export default function OrderConfirmation() {
  // State
  const [orderDetails, setOrderDetails] = useState(null);

  // Contexts
  const { getOrderById } = useOrderContext();

  // Hooks
  const { orderId } = useParams();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    const response = await getOrderById(orderId);
    setOrderDetails(response);
  };

  return orderDetails ? (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4">
      <div className="relative w-full p-2 bg-teal-500 rounded-lg flex flex-col items-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-full p-4 bg-teal-500 border border-white border-8">
            {icons.check}
          </div>
        </div>
        <div className="mt-10 space-y-4 mb-4">
          <div className="text-3xl font-bold">Order No. {orderDetails.id}</div>
          <div className="text-4xl font-bold">Thank you for your order!</div>
          <div className="text-lg">
            The order confirmation has been send to the vendor for processing.
          </div>
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-1/2 bg-teal-800 rounded-lg py-4">
              <div className="text-2xl font-bold">
                ${orderDetails.totalPrice}
              </div>
              <div className="text-md">Total amount</div>
            </div>
            <div className="flex flex-col w-1/2 bg-teal-800 rounded-lg py-4">
              <div className="text-2xl font-bold">
                x{orderDetails.items.length}
              </div>
              <div className="text-md">Items ordered</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-200">
          <thead className="text-xs uppercase bg-gray-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                #
              </th>
              <th scope="col" className="px-6 py-3 ">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 ">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            {orderDetails.items.map((value, idx) => (
              <tr key={value.id}>
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4 w-1/12">
                  {value.book.image_url ? (
                    <img
                      src={`http://localhost:3000${value.book.image_url}`}
                      alt={value.book.title}
                      className="object-cover h-32 w-24 rounded-lg"
                    />
                  ) : (
                    <div className="bg-slate-300 h-32 w-24 rounded-lg flex items-center justify-center">
                      <div className="font-bold rounded-full bg-red-900 p-2">
                        {icons.exclamation}
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{value.book.title}</td>
                <td className="px-6 py-4">{value.book.author}</td>
                <td className="px-6 py-4">{value.price}</td>
                <td className="px-6 py-4">{value.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div>{icons.loading}</div>
  );
}
