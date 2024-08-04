import axios from "axios";
import React, { useEffect, useState } from "react";
import authService from "../../authentication/authService";
import { icons } from "../../assets/icons/IconData";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllBooks();
    // fetchPendingBooks();
    // eslint-disable-next-line
  }, []);

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/books`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   const fetchPendingBooks = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/books/status/${1}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authService.getToken()}`,
  //           },
  //         }
  //       );
  //       setBooks(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };

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

  return loading ? (
    <div></div>
  ) : (
    <div className="text-white flex flex-col space-y-4">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
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
                  <div
                    className={`font-bold tracking-widest p-2 rounded-xl text-center ${value.status_bg_color} ${value.status_text_color}`}
                  >
                    {value.status_label.toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-3 w-1/5 space-x-4">
                  <button
                    onClick={() => deleteBook(value.id)}
                    className="text-white py-1 px-2 rounded-lg bg-red-800 hover:bg-red-600 transition-colors duration-300 font-bold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
