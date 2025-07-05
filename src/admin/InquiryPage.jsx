import React, { useState } from "react";

export default function InquiryPage({ userRole = "customer" }) {
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      email: "user1@example.com",
      message: "I need help with my order.",
      phone: "123456789",
      date: "2025-07-04",
      response: "",
      isResolved: false,
    },
    {
      id: 2,
      email: "user2@example.com",
      message: "When will my product arrive?",
      phone: "987654321",
      date: "2025-07-02",
      response: "Your order will arrive next week.",
      isResolved: true,
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const startEditing = (id, currentMessage) => {
    setEditingId(id);
    setEditMessage(currentMessage);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditMessage("");
  };

  const saveUpdate = (id) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, message: editMessage } : inq
      )
    );
    setEditingId(null);
    setEditMessage("");
  };

  const handleDelete = (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  // Format date nicely
  const formatDate = (d) => {
    const dateObj = new Date(d);
    return dateObj.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Inquiries</h1>

      {inquiries.length === 0 ? (
        <p className="text-gray-600">No inquiries found.</p>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-col space-y-1 md:flex-row md:space-x-6 md:space-y-0 md:flex-1">
                <div>
                  <p className="font-semibold text-gray-900">{inq.email}</p>
                  <p className="text-sm text-gray-500">Phone: {inq.phone}</p>
                  <p className="text-sm text-gray-500">
                    Date: {formatDate(inq.date)}
                  </p>
                </div>

                <div className="flex-1">
                  {editingId === inq.id ? (
                    <textarea
                      className="w-full border rounded p-2"
                      rows={3}
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-700">{inq.message}</p>
                  )}
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      inq.isResolved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {inq.isResolved ? "Resolved" : "Pending"}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                {(userRole === "admin" || (userRole === "customer" && editingId === inq.id)) &&
                  (editingId === inq.id ? (
                    <>
                      <button
                        onClick={() => saveUpdate(inq.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEditing(inq.id, inq.message)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                  ))}

                {userRole === "admin" && (
                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
