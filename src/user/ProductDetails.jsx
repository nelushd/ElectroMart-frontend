// src/user/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from 'axios';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Mock fetch – replace with real API later
  useEffect(() => {
    const mockProducts = [
      {
        id: "p1",
        name: "Smartphone XYZ",
        price: 29999,
        category: "Mobile Phones",
        dimension: "75 x 160 x 8 mm",
        description: "High-performance smartphone with great camera.",
        availability: true,
        image: "https://example.com/images/smartphone-xyz.jpg",
      },
    ];

    const selected = mockProducts.find((p) => p.id === id);
    setProduct(selected);
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow w-full h-auto object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-2">{product.category}</p>
          <p className="text-xl font-bold text-indigo-600 mb-4">₹{product.price}</p>
          <p className="mb-4 text-gray-700">{product.description}</p>
          <p className="mb-2 text-sm text-gray-500">Dimension: {product.dimension}</p>
          <p className="mb-4 text-sm">
            Availability:{" "}
            <span className={product.availability ? "text-green-600" : "text-red-600"}>
              {product.availability ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            disabled={!product.availability}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
