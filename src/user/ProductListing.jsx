import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => navigate(`/product/${product.key}`)}
          className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col cursor-pointer"
        >
          <img
            src={product.image?.[0] }
            alt={product.name}
            className="h-48 w-full object-contain mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-xl font-bold text-indigo-600">Rs {product.price}</p>
        </div>
      ))}
    </div>
  </div>
);

}
