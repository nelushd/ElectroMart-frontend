import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

export default function ProductPage() {
  // Sample initial dummy data - replace with your backend data
  const [products, setProducts] = useState([
    {
      key: "p1",
      name: "Wooden Chair",
      price: 1200,
      category: "Furniture",
      dimension: "40x40x90 cm",
      description: "Comfortable wooden chair.",
      availability: true,
      image: [
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1505692794400-08d63b6f4ec4?auto=format&fit=crop&w=100&q=80",
      ],
    },
    {
      key: "p2",
      name: "Table Lamp",
      price: 750,
      category: "Lighting",
      dimension: "15x15x30 cm",
      description: "Modern desk lamp with warm light.",
      availability: false,
      image: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=100&q=80",
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const emptyForm = {
    name: "",
    price: "",
    category: "",
    dimension: "",
    description: "",
    availability: true,
    image: [""], // array with one empty string by default
  };

  const [form, setForm] = useState(emptyForm);

  // Handle input change for all fields except images
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle individual image URL change by index
  const handleImageChange = (index, value) => {
    setForm((prev) => {
      const newImages = [...prev.image];
      newImages[index] = value;
      return { ...prev, image: newImages };
    });
  };

  // Add new image URL field
  const addImageField = () => {
    setForm((prev) => ({ ...prev, image: [...prev.image, ""] }));
  };

  // Remove image URL field by index
  const removeImageField = (index) => {
    setForm((prev) => {
      const newImages = prev.image.filter((_, i) => i !== index);
      return { ...prev, image: newImages.length ? newImages : [""] };
    });
  };

  // Submit add or update product
  const handleSubmit = (e) => {
    e.preventDefault();

    const newKey = editingKey || `p${products.length + 1}`;

    // Clean images by filtering empty strings
    const cleanedImages = form.image.filter((url) => url.trim() !== "");

    const newProduct = {
      ...form,
      price: Number(form.price), // convert price to number
      key: newKey,
      image: cleanedImages.length ? cleanedImages : [""], // fallback empty array
    };

    if (editingKey) {
      setProducts((prev) =>
        prev.map((p) => (p.key === editingKey ? newProduct : p))
      );
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }

    setForm(emptyForm);
    setEditingKey(null);
    setShowModal(false);
  };

  // Edit product handler
  const handleEdit = (product) => {
    setForm({
      ...product,
      price: product.price.toString(), // make sure price is string for input
      image: product.image.length ? product.image : [""],
    });
    setEditingKey(product.key);
    setShowModal(true);
  };

  // Delete product handler with confirm
  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.key !== key));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Management</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingKey(null);
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-3">Images</th>
              <th className="border border-gray-300 p-3">Name</th>
              <th className="border border-gray-300 p-3">Price (LKR)</th>
              <th className="border border-gray-300 p-3">Category</th>
              <th className="border border-gray-300 p-3">Dimension</th>
              <th className="border border-gray-300 p-3">Available</th>
              <th className="border border-gray-300 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-600">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.key} className="border-t border-gray-300">
                  <td className="p-2 border border-gray-300 flex space-x-2">
                    {p.image.map((url, i) => (
                      <img
                        key={i}
                        src={url || "https://via.placeholder.com/60"}
                        alt={`${p.name} image ${i + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </td>
                  <td className="p-2 border border-gray-300">{p.name}</td>
                  <td className="p-2 border border-gray-300">{p.price}</td>
                  <td className="p-2 border border-gray-300">{p.category}</td>
                  <td className="p-2 border border-gray-300">{p.dimension}</td>
                  <td className="p-2 border border-gray-300">
                    {p.availability ? "Yes" : "No"}
                  </td>
                  <td className="p-2 border border-gray-300 flex justify-center space-x-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded"
                      title="Edit product"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p.key)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded"
                      title="Delete product"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-full overflow-y-auto p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-6">
              {editingKey ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-2 border rounded"
              />

              <input
                required
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price (LKR)"
                min={0}
                className="w-full p-2 border rounded"
              />

              <input
                required
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border rounded"
              />

              <input
                required
                name="dimension"
                value={form.dimension}
                onChange={handleChange}
                placeholder="Dimension (e.g. 40x40x90 cm)"
                className="w-full p-2 border rounded"
              />

              <textarea
                required
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="w-full p-2 border rounded"
              />

              {/* Multiple images input */}
              <div>
                <label className="block mb-1 font-semibold">Image URLs</label>
                {form.image.map((url, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageChange(i, e.target.value)}
                      placeholder="Image URL"
                      className="flex-grow p-2 border rounded"
                      required={i === 0}
                    />
                    {form.image.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(i)}
                        className="text-red-600 hover:text-red-900"
                        aria-label="Remove image URL"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-blue-600 hover:text-blue-900"
                >
                  + Add another image
                </button>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="availability"
                  checked={form.availability}
                  onChange={handleChange}
                />
                Available
              </label>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  {editingKey ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
