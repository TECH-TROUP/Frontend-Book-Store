import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import authService from "../../authentication/authService";
import EditModal from "../../components/EditModal";

export default function AdminCategories() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const formRef = useRef(null);

  const handleButtonClick = () => {
    setFormVisible(!isFormVisible);
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/categories`,
        {}
      );
      setCategories(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const form = formRef.current;
    if (form) {
      if (isFormVisible) {
        form.style.height = `${form.scrollHeight}px`;
      } else {
        form.style.height = "0px";
      }
    }
  }, [isFormVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/categories",
        {
          category_name: categoryName,
          description,
        },
        authService.getAuthHeader()
      );
      console.log("Category created:", response.data);
      // Reset form or handle success as needed
      setCategoryName("");
      setDescription("");
      setFormVisible(false);
      fetchAllCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const updateCategory = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/categories/${selectedCategory.id}`,
        {
          category_name: selectedCategory.category_name,
          description: selectedCategory.description,
        },
        authService.getAuthHeader()
      );
      fetchAllCategories();
      setSelectedCategory(null);
      closeModal();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      fetchAllCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory({ ...selectedCategory, [name]: value });
  };

  return loading ? (
    <div></div>
  ) : (
    <div className="flex flex-col space-y-4 text-white">
      <button
        className="p-2 bg-purple-300/10 rounded-lg hover:bg-purple-500/70 transition-colors duration-300"
        onClick={handleButtonClick}
      >
        Add new Category
      </button>

      <div
        ref={formRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: isFormVisible ? "auto" : "0px" }}
      >
        <div className="p-4 bg-gray-800 rounded-lg">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <label className="flex flex-col ">
              <span className="text-gray-300 text-left font-bold">
                Category Name
              </span>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="p-2 rounded-md border border-gray-600 bg-gray-900 text-white"
                placeholder="Enter category name"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-300 text-left font-bold">
                Description
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 rounded-md border border-gray-600 bg-gray-900 text-white"
                placeholder="Enter category description"
              />
            </label>
            <button
              type="submit"
              className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Submit
            </button>
          </form>
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
                Description
              </th>
              <th scope="col" className="px-6 py-3 ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            {categories.map((value) => (
              <tr key={value.id}>
                <td className="px-6 py-4">{value.id}</td>
                <td className="px-6 py-4">{value.category_name}</td>
                <td className="px-6 py-4">{value.description}</td>
                <td className="px-6 py-3 w-1/5 space-x-4">
                  <button
                    onClick={() => openModal(value)}
                    className="text-white py-1 px-2 rounded-lg bg-blue-800 hover:bg-blue-600 transition-colors duration-300 font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteCategory(value.id);
                    }}
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
      {isModalOpen && (
        <EditModal
          title="Edit Category"
          onClose={closeModal}
          onSubmit={updateCategory}
        >
          <div>
            <label className="block text-left">Name</label>
            <input
              type="text"
              name="category_name"
              value={selectedCategory.category_name || ""}
              onChange={handleChange}
              className="text-black block w-full border-gray-300 rounded-md shadow-sm outline-none py-1 px-2"
            />
          </div>
          <div>
            <label className="block text-left">Description</label>
            <textarea
              name="description"
              value={selectedCategory.description || ""}
              onChange={handleChange}
              className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm outline-none py-1 px-2 text-wrap"
            />
          </div>
        </EditModal>
      )}
    </div>
  );
}
