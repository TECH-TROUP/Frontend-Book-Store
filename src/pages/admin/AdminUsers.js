import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import authService from "../../authentication/authService";
import axios from "axios";
import { useUserContext } from "../../context/userContext";

export default function AdminUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const { user } = useUserContext();

  const role = searchParams.get("role");

  useEffect(() => {
    const tkn = authService.getToken();
    if (tkn) {
      setLoading(true);
      setUsers([]);
      fetchAllUsers(tkn);
    }
    // eslint-disable-next-line
  }, [role]);

  const fetchAllUsers = async (tkn) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/roles/${role}`,
        {
          headers: {
            Authorization: `Bearer ${tkn}`,
          },
        }
      );
      setUsers(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, roleId) => {
    setLoading(true);
    const tkn = authService.getToken();
    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/update-role",
        { userId, roleId },
        {
          headers: {
            Authorization: `Bearer ${tkn}`,
          },
        }
      );
      await fetchAllUsers(tkn);
      return response.data;
    } catch (error) {
      // Handle the error as needed
      console.error(
        "Error updating user role:",
        error.response?.data || error.message
      );
      setLoading(false);
      throw error;
    }
  };

  return (
    <div className="text-white flex flex-col space-y-4">
      {loading ? (
        <div></div>
      ) : (
        <>
          <div className="flex space-x-4">
            <div
              onClick={() => setSearchParams({ role: 1 })}
              className={`${
                parseInt(role) === 1
                  ? "font-bold bg-purple-700"
                  : "bg-purple-300/10"
              } w-4/12  rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
            >
              Admins
            </div>
            <div
              onClick={() => setSearchParams({ role: 2 })}
              className={`${
                parseInt(role) === 2
                  ? "font-bold bg-purple-700"
                  : "bg-purple-300/10"
              } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
            >
              Customers
            </div>
            <div
              onClick={() => setSearchParams({ role: 3 })}
              className={`${
                parseInt(role) === 3
                  ? "font-bold bg-purple-700"
                  : "bg-purple-300/10"
              } w-4/12 bg-purple-300/10 rounded-lg py-2 cursor-pointer hover:bg-purple-500/70 transition-colors duration-300`}
            >
              Vendors
            </div>
          </div>
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-200">
              <thead className="text-xs uppercase bg-gray-700 text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 ">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>

                  <th scope="col" className="px-6 py-3 ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                {users.map((value) => (
                  <tr key={value.id}>
                    <td className="px-6 py-4">{value.id}</td>
                    <td className="px-6 py-4">{value.name}</td>
                    <td className="px-6 py-4">{value.username}</td>
                    <td className="px-6 py-4">{value.email}</td>
                    {parseInt(role) === 2 ? (
                      <td className="px-6 py-4 w-1/5 space-x-4">
                        <button
                          onClick={() => updateUserRole(value.id, 1)}
                          className="bg-red-600 text-white py-1 px-2 rounded-lg hover:bg-red-900 transition-colors duration-300 font-bold"
                        >
                          Convert to Admin
                        </button>
                        <button
                          onClick={() => updateUserRole(value.id, 3)}
                          className="bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 font-bold"
                        >
                          Convert to Vendor
                        </button>
                      </td>
                    ) : (
                      <td className="px-6 py-3">
                        <button
                          disabled={user.id === value.id}
                          onClick={() => updateUserRole(value.id, 2)}
                          className={`${
                            user.id === value.id
                              ? "bg-gray-600 cursor-not-allowed"
                              : "bg-green-800 hover:bg-green-600 transition-colors duration-300 font-bold"
                          }  text-white py-1 px-2 rounded-lg `}
                        >
                          Convert to Customer
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
