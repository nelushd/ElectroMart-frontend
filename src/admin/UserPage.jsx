import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

export default function UserPage() {
  // Dummy users data - replace with backend data later
  const [users, setUsers] = useState([
    {
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "customer",
      phone: "1234567890",
      address: "123 Main St",
      profilePicture:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      phone: "0987654321",
      address: "456 Admin Rd",
      profilePicture:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ]);

  const emptyForm = {
    email: "",
    firstName: "",
    lastName: "",
    role: "customer",
    phone: "",
    address: "",
    profilePicture:
      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?w=768",
  };

  const [form, setForm] = useState(emptyForm);
  const [editingEmail, setEditingEmail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  // Open edit user modal
  const handleEditUser = (user) => {
    setForm(user);
    setEditingEmail(user.email);
    setShowModal(true);
  };

  // Delete user with confirm
  const handleDeleteUser = (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.email !== email));
    }
  };

  // Submit form for add or update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmail) {
      // Update existing user
      setUsers((prev) =>
        prev.map((u) => (u.email === editingEmail ? form : u))
      );
    } else {
      // Add new user
      if (users.some((u) => u.email === form.email)) {
        alert("Email already exists!");
        return;
      }
      setUsers((prev) => [...prev, form]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

   
     
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-3">Profile</th>
              <th className="border border-gray-300 p-3">Name</th>
              <th className="border border-gray-300 p-3">Email</th>
              <th className="border border-gray-300 p-3">Role</th>
              <th className="border border-gray-300 p-3">Phone</th>
              <th className="border border-gray-300 p-3">Address</th>
              <th className="border border-gray-300 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-600">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.email} className="border-t border-gray-300">
                  <td className="p-2 border border-gray-300">
                    <img
                      src={user.profilePicture}
                      alt={user.firstName + " " + user.lastName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-2 border border-gray-300">{user.email}</td>
                  <td className="p-2 border border-gray-300 capitalize">
                    {user.role}
                  </td>
                  <td className="p-2 border border-gray-300">{user.phone}</td>
                  <td className="p-2 border border-gray-300">{user.address}</td>
                  <td className="p-2 border border-gray-300 flex justify-center gap-3">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded"
                      title="Edit user"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded"
                      title="Delete user"
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

      {/* Modal for add/edit user */}
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
              {editingEmail ? "Edit User" : "Add User"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
                disabled={!!editingEmail}
              />

              <input
                required
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />

              <input
                required
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />

              <select
                required
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>

              <input
                required
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
              />

              <input
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border rounded"
              />

              <input
                name="profilePicture"
                value={form.profilePicture}
                onChange={handleChange}
                placeholder="Profile Picture URL"
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  {editingEmail ? "Update" : "Create"}
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
