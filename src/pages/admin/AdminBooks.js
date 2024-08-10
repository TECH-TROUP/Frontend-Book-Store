import axios from "axios";
import React, { useEffect, useState } from "react";
import authService from "../../authentication/authService";
import { icons } from "../../assets/icons/IconData";
import { useNavigate, useSearchParams } from "react-router-dom";
import StatusChip from "../../components/StatusChip";

export default function AdminBooks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusId = searchParams.get("status");

  const navigate = useNavigate();

  useEffect(() => {
    setBooks([]);

    const initializeData = async () => {
      setLoading(true);
      await fetchAllBooks();
      setLoading(false);
    };

    initializeData();
    // eslint-disable-next-line
  }, [statusId]);

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/books/status/${statusId}`,
        authService.getAuthHeader()
      );
      setBooks(response.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      fetchAllBooks();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const updateBookStatus = async (bookId, statusId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/books/${bookId}/status`,
        {
          bookId,
          statusId,
        },
        authService.getAuthHeader()
      );
      console.log("Book status updated successfully:", response.data);
      fetchAllBooks();
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  const approveBookStatus = async (bookId, numberOfCopies) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/books/approve`,
        {
          bookId,
          numberOfCopies,
        },
        authService.getAuthHeader()
      );
      console.log("Book status updated successfully:", response.data);
      fetchAllBooks();
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  return loading ? (
    <div></div>
  ) : (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4 text-white">
      <div className="flex space-x-4">
        <div
          onClick={() => setSearchParams({ status: 1 })}
          className={`${
            parseInt(statusId) === 1
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12  rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Pending Approval
        </div>
        <div
          onClick={() => setSearchParams({ status: 2 })}
          className={`${
            parseInt(statusId) === 2
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Approved
        </div>
        <div
          onClick={() => setSearchParams({ status: 3 })}
          className={`${
            parseInt(statusId) === 3
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Rejected
        </div>
        <div
          onClick={() => setSearchParams({ status: 12 })}
          className={`${
            parseInt(statusId) === 13
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Out-of-Stock
        </div>
      </div>
      <div className="flex-1 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-200">
          <thead className="text-xs uppercase bg-gray-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Id
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
                Description
              </th>
              <th scope="col" className="px-6 py-3 ">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 ">
                Category
              </th>
              <th scope="col" className="px-6 py-3 ">
                Image
              </th>
              <th scope="col" className="px-6 py-3 ">
                Status
              </th>
              <th scope="col" className="px-6 py-3 ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            {books.map((value) => (
              <tr key={value.id}>
                <td className="px-6 py-4">{value.id}</td>
                <td className="px-6 py-4">{value.title}</td>
                <td className="px-6 py-4">{value.author}</td>
                <td className="px-6 py-4">{value.price}</td>
                <td className="px-6 py-4">{value.description}</td>
                <td className="px-6 py-4">{value.stock}</td>
                <td className="px-6 py-4">{value.category_name}</td>
                <td className="px-6 py-4 w-1/12">
                  {value.image_url ? (
                    <img
                      src={`http://localhost:3000${value.image_url}`}
                      alt={value.title}
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
                <td className={`px-6 py-4 w-1/12`}>
                  <StatusChip id={value.status_id} label={value.status_label} />
                </td>
                <td className="px-6 py-3 w-1/5 space-x-4">
                  {parseInt(statusId) === 1 ? (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => approveBookStatus(value.id, value.stock)}
                        className="text-white py-1 px-2 rounded-lg bg-green-800 hover:bg-green-600 transition-colors duration-300 font-bold"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateBookStatus(value.id, 3)}
                        className="text-white py-1 px-2 rounded-lg bg-red-800 hover:bg-red-600 transition-colors duration-300 font-bold"
                      >
                        Reject
                      </button>
                    </div>
                  ) : parseInt(statusId) === 3 ? (
                    <button
                      onClick={() => deleteBook(value.id)}
                      className="text-white py-1 px-2 rounded-lg bg-red-800 hover:bg-red-600 transition-colors duration-300 font-bold"
                    >
                      Delete
                    </button>
                  ) : (
                    <div className="flex justify-center items-center">
                      <div
                        onClick={() => navigate(`${value.id}?status=4`)}
                        className="bg-green-700/80 rounded-3xl p-2 hover:bg-green-500 transition-colors duration-300 cursor-pointer"
                      >
                        {icons.arrow_right}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {books.length === 0 && <div>No books with this status!</div>}
    </div>
  );
}
