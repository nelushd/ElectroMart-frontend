import React, { useState } from "react";

export default function ReviewPage({ userRole = "admin" }) {
  const [reviews, setReviews] = useState([
    {
      email: "user1@example.com",
      name: "John Doe",
      rating: "5",
      comment: "Great service!",
      date: "2025-07-01T12:00:00Z",
      isApproved: false,
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      email: "user2@example.com",
      name: "Jane Smith",
      rating: "4",
      comment: "Good experience.",
      date: "2025-06-30T15:30:00Z",
      isApproved: true,
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ]);

  // Format date nicely
  const formatDate = (d) => {
    const dateObj = new Date(d);
    return dateObj.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleApprove = (email) => {
    setReviews((prev) =>
      prev.map((r) => (r.email === email ? { ...r, isApproved: true } : r))
    );
  };

  const handleDelete = (email) => {
    setReviews((prev) => prev.filter((r) => r.email !== email));
  };

  // Helper to render stars from rating string (assuming 1-5)
  const renderStars = (rating) => {
    const stars = [];
    const num = parseInt(rating, 10);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < num ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.196-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Manage Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews available.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.email}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={review.profilePicture}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-500">{review.email}</p>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
              </div>

              {/* Review Comment */}
              <p className="mt-4 md:mt-0 md:flex-1 md:px-6 text-gray-700">
                {review.comment}
              </p>

              {/* Date */}
              <p className="text-sm text-gray-400">
                {formatDate(review.date)}
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4 md:mt-0">
                {review.isApproved ? (
                  <span className="inline-block px-4 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-sm">
                    Approved
                  </span>
                ) : userRole === "admin" ? (
                  <button
                    onClick={() => handleApprove(review.email)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Approve
                  </button>
                ) : null}
                {userRole === "admin" && (
                  <button
                    onClick={() => handleDelete(review.email)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
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
