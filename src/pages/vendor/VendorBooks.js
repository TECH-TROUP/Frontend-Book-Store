import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import EditModal from "../../components/EditModal";
import authService from "../../authentication/authService";
import { icons } from "../../assets/icons/IconData";
import { useUserContext } from "../../context/userContext";

const initBook = {
  title: "",
  author: "",
  price: 0,
  description: "",
  stock: 0,
  category_id: null,
  image: null,
  vendor_id: null,
};

export default function VendorBooks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [newBook, setNewBook] = useState(initBook);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { user } = useUserContext();

  const openModal = (book) => {
    setIsModalOpen(true);
    setSelectedBook(book);
  };

  const closeModal = () => {
    // Reset Form

    setNewBook(initBook);

    if (user) {
      setNewBook((prevState) => ({
        ...prevState,
        vendor_id: user.id,
      }));
    }

    setSelectedBook(null);
    setError(null);
    setImagePreview(null);

    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      setNewBook((prevState) => ({
        ...prevState,
        vendor_id: user.id,
      }));
    }
    fetchAllBooks();
    fetchAllCategories();
    // eslint-disable-next-line
  }, []);

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/books/vendor/${user.id}`,
        {}
      );
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/categories`,
        {}
      );

      // Map categories to the format required by react-select
      const options = response.data.map((category) => ({
        value: category.id,
        label: category.category_name,
        description: category.description,
        count: category.count,
      }));
      setCategories(options);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (selectedOption) => {
    const categoryId = selectedOption.value;

    if (selectedBook) {
      setSelectedBook((prevState) => ({
        ...prevState,
        category_id: categoryId,
      }));
    } else {
      setNewBook((prevState) => ({
        ...prevState,
        category_id: categoryId,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);

      if (selectedBook) {
        setSelectedBook((prevState) => ({
          ...prevState,
          image: file,
        }));
      } else {
        setNewBook((prevState) => ({
          ...prevState,
          image: file,
        }));
      }

      // Generate image preview URL
      setImagePreview(previewUrl);
    } else {
      if (selectedBook) {
        setSelectedBook((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else {
        setNewBook((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in newBook) {
      formData.append(key, newBook[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/books",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Book added successfully:", response.data);
      fetchAllBooks();
      closeModal();
    } catch (error) {
      console.error("Error adding book:", error);
      setError(error.response.data.error);
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

  const updateBook = async () => {
    const formData = new FormData();
    for (const key in selectedBook) {
      formData.append(key, selectedBook[key]);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/books/${selectedBook.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Book updated successfully:", response.data);
      fetchAllBooks();
      closeModal();
    } catch (error) {
      console.error("Error updating book:", error);
      setError(error.response.data.error);
    }
  };

  return loading ? (
    <div></div>
  ) : (
    <div className="text-white flex flex-col space-y-4">
      <button
        onClick={() => openModal(null)}
        className="p-2 bg-purple-300/10 rounded-lg hover:bg-purple-500/70 transition-colors duration-300"
      >
        Add new Book
      </button>
      {isModalOpen && (
        <EditModal
          title="Add new Book"
          onClose={closeModal}
          onSubmit={selectedBook ? updateBook : handleSubmit}
        >
          <input
            type="text"
            name="title"
            value={selectedBook ? selectedBook.title : newBook.title}
            onChange={handleChange}
            className="text-black p-2 rounded-md w-full outline-none"
            placeholder="Title"
          />
          <input
            type="text"
            value={selectedBook ? selectedBook.author : newBook.author}
            onChange={handleChange}
            name="author"
            className="text-black p-2 rounded-md w-full outline-none"
            placeholder="Author"
          />
          <textarea
            rows={5}
            value={
              selectedBook ? selectedBook.description : newBook.description
            }
            onChange={handleChange}
            name="description"
            className="text-black p-2 rounded-md w-full outline-none"
            placeholder="Description"
          />
          <div>
            <label className="block text-left">Price</label>
            <input
              type="number"
              value={selectedBook ? selectedBook.price : newBook.price}
              onChange={handleChange}
              name="price"
              className="text-black p-2 rounded-md w-full outline-none"
              placeholder="Price"
            />
          </div>

          <div>
            <label className="block text-left">Stock</label>
            <input
              type="number"
              value={selectedBook ? selectedBook.stock : newBook.stock}
              onChange={handleChange}
              name="stock"
              className="text-black p-2 rounded-md w-full outline-none"
              placeholder="Stock"
            />
          </div>

          <div className="w-full max-w-md">
            <Select
              options={categories}
              value={categories.find(
                (cat) =>
                  cat.value ===
                  (selectedBook
                    ? selectedBook.category_id
                    : newBook.category_id)
              )}
              onChange={handleCategoryChange}
              placeholder="Search categories..."
              classNamePrefix="react-select "
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
            />
          </div>

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="block w-full text-sm text-white font-bold file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />

          {imagePreview ? (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover h-32 w-24 rounded-lg"
              />
            </div>
          ) : (
            selectedBook &&
            selectedBook.image_url && (
              <div className="mt-4">
                <img
                  src={`http://localhost:3000${selectedBook.image_url}`}
                  alt={selectedBook.title}
                  className="object-cover h-32 w-24 rounded-lg"
                />
              </div>
            )
          )}

          {error && (
            <div className="flex flex-col items-center space-y-4 mt-4">
              <div className="flex items-center">
                <div className="border-b w-44 border-slate-300/50" />
              </div>
              <div className="text-white px-4 py-2 bg-red-500 rounded-xl text-sm flex w-full justify-between">
                <div>{error}</div>
                <div className="cursor-pointer" onClick={() => setError(null)}>
                  {icons.close}
                </div>
              </div>
            </div>
          )}
        </EditModal>
      )}

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
                    onClick={() => openModal(value)}
                    className="text-white py-1 px-2 rounded-lg bg-blue-800 hover:bg-blue-600 transition-colors duration-300 font-bold"
                  >
                    Edit
                  </button>
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
