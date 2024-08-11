import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import authService from "../../authentication/authService";
import Select from "react-select";

const statusOptions = [
  {
    value: 4,
    label: "Available - Sale",
  },
  {
    value: 5,
    label: "Available - Rent",
  },
  {
    value: 6,
    label: "Checked-Out",
  },
  {
    value: 7,
    label: "Rented",
  },
  {
    value: 8,
    label: "Returned",
  },
  {
    value: 9,
    label: "Lost",
  },
  {
    value: 10,
    label: "Damaged",
  },
  {
    value: 11,
    label: "In-Repair",
  },
  {
    value: 12,
    label: "Sold",
  },
];

export default function VendorBookCopies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusId = searchParams.get("status");
  const { bookId } = useParams();

  useEffect(() => {
    fetchAllBooks();
    // eslint-disable-next-line
  }, [statusId]);

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/bookcopies/${bookId}/${statusId}`,
        authService.getAuthHeader()
      );
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    selectedOption,
    copyId,
    bookId,
    previousStatusId
  ) => {
    const statusId = selectedOption.value;

    try {
      const response = await axios.put(
        `http://localhost:3000/api/bookCopies/${copyId}/status`,
        {
          statusId,
          previousStatusId,
          bookId,
        },
        authService.getAuthHeader()
      );
      console.log("Book status updated successfully:", response.data);
      fetchAllBooks();
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  const deleteBook = async (id, bookId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/bookCopies/${id}?bookId=${bookId}`,
        authService.getAuthHeader()
      );
      fetchAllBooks();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return loading ? (
    <div></div>
  ) : (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4">
      <div className="flex space-x-4">
        <div
          onClick={() => setSearchParams({ status: 4 })}
          className={`${
            parseInt(statusId) === 4
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Available - Sale
        </div>
        <div
          onClick={() => setSearchParams({ status: 5 })}
          className={`${
            parseInt(statusId) === 5
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Available - Rent
        </div>
        <div
          onClick={() => setSearchParams({ status: 6 })}
          className={`${
            parseInt(statusId) === 6
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Checked-Out
        </div>
        <div
          onClick={() => setSearchParams({ status: 7 })}
          className={`${
            parseInt(statusId) === 7
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Rented
        </div>
        <div
          onClick={() => setSearchParams({ status: 8 })}
          className={`${
            parseInt(statusId) === 8
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Returned
        </div>
        <div
          onClick={() => setSearchParams({ status: 9 })}
          className={`${
            parseInt(statusId) === 9
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Lost
        </div>
        <div
          onClick={() => setSearchParams({ status: 10 })}
          className={`${
            parseInt(statusId) === 10
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Damaged
        </div>
        <div
          onClick={() => setSearchParams({ status: 11 })}
          className={`${
            parseInt(statusId) === 11
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          In-Repair
        </div>
        <div
          onClick={() => setSearchParams({ status: 12 })}
          className={`${
            parseInt(statusId) === 12
              ? "font-bold bg-purple-700"
              : "bg-purple-300/10"
          } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
        >
          Sold
        </div>
      </div>
      <div className="flex-1 overflow-y-auto shadow-md sm:rounded-lg">
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
                Category
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
                <td className="px-6 py-4">{value.book_title}</td>
                <td className="px-6 py-4">{value.book_author}</td>
                <td className="px-6 py-4">{value.book_price}</td>
                <td className="px-6 py-4">{value.category_name}</td>
                <td className={`px-6 py-4 w-2/12`}>
                  {/* <StatusChip id={value.status_id} label={value.status_label} /> */}
                  <div className="w-full max-w-md">
                    <Select
                      options={statusOptions}
                      value={statusOptions.find(
                        (status) => status.value === value.status_id
                      )}
                      onChange={(selOption) =>
                        handleStatusChange(
                          selOption,
                          value.id,
                          value.book_id,
                          value.status_id
                        )
                      }
                      placeholder="Select Status"
                      classNamePrefix="react-select-status "
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          fontWeight: "bold",
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "black",
                          fontWeight: "bold",
                        }),
                      }}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </div>
                </td>
                <td className="px-6 py-3 space-x-4">
                  <button
                    onClick={() => deleteBook(value.id, value.book_id)}
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
