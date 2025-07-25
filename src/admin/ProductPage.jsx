import { useEffect, useState } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ key: "", name: "", price: "", category: "", dimension: "", description: "", availability: true, image: [""] });
  const [editing, setEditing] = useState(null);
  const [modal, setModal] = useState(false);

  const api = async (method, url, data) => {
    const token = localStorage.getItem('token');
    const config = { method, headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } };
    if (data) config.body = JSON.stringify(data);

    try {
      const res = await fetch(`/api/products${url}`, config);
      if (!res.ok) throw new Error((await res.json()).message);
      return method !== 'DELETE' ? res.json() : null;
    } catch (err) {
      alert(err.message);
      throw err;
    }
  };

  const fetchProducts = () => api('GET', '').then(setProducts).catch(() => {});

  useEffect(() => { fetchProducts(); }, []);

  const openModal = (product = null) => {
    setForm(product || { key: "", name: "", price: "", category: "", dimension: "", description: "", availability: true, image: [""] });
    setEditing(product?.key || null);
    setModal(true);
  };

  const closeModal = () => { setModal(false); setEditing(null); };

  const handleSubmit = async () => {
    if (!form.key || !form.name || !form.price) {
      alert('Please fill required fields');
      return;
    }
    try {
      await api(editing ? 'PUT' : 'POST', editing ? `/${editing}` : '', form);
      fetchProducts();
      closeModal();
    } catch {}
  };

  const handleDelete = async (key) => {
    if (confirm("Delete this product?")) {
      try {
        await api('DELETE', `/${key}`);
        fetchProducts();
      } catch {}
    }
  };

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const updateImage = (index, value) => {
    const images = [...form.image];
    images[index] = value;
    setForm(prev => ({ ...prev, image: images }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 w-32">Key</th>
              <th className="px-4 py-3 w-24">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Dimension</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.key} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">{p.key}</td>
                <td className="px-4 py-2">
                  <img src={p.image?.[0]} alt="Product" className="w-16 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">Rs{p.price}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">{p.dimension}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-sm ${p.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {p.availability ? 'Available' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => openModal(p)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(p.key)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{editing ? 'Edit' : 'Add'} Product</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Product Key"
                  value={form.key}
                  onChange={(e) => updateForm('key', e.target.value)}
                  disabled={editing}
                  className="border rounded px-3 py-2 disabled:bg-gray-100"
                />
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  className="border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => updateForm('price', e.target.value)}
                  className="border rounded px-3 py-2"
                />
                <input
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => updateForm('category', e.target.value)}
                  className="border rounded px-3 py-2"
                />
                <input
                  placeholder="Dimension"
                  value={form.dimension}
                  onChange={(e) => updateForm('dimension', e.target.value)}
                  className="border rounded px-3 py-2"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.availability}
                    onChange={(e) => updateForm('availability', e.target.checked)}
                  />
                  <span>Available</span>
                </label>
              </div>

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => updateForm('description', e.target.value)}
                rows={3}
                className="w-full border rounded px-3 py-2"
              />

              <div>
                <label className="block text-sm font-medium mb-2">Images</label>
                {form.image.map((img, i) => (
                  <input
                    key={i}
                    placeholder={`Image URL ${i + 1}`}
                    value={img}
                    onChange={(e) => updateImage(i, e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, image: [...prev.image, ""] }))}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Add Image
                </button>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button onClick={closeModal} className="px-4 py-2 border rounded hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
