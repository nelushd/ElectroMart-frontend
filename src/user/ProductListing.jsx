import React, { useEffect, useState } from "react";

export default function ProductListing() {
  const [products, setProducts] = useState([]);

  // Example mock products - replace with API call later
  useEffect(() => {
    setProducts([
      {
        id: "p1",
        name: "Smartphone XYZ",
        price: 29999,
        category: "Mobile Phones",
        image:
          "https://cdn.gqmobiles.lk/wp-content/uploads/2024/10/gq-mobiles-apple-iphone-16-pro-max-smartphone-black-titanium.png",
      },
      {
        id: "p2",
        name: "4K LED TV",
        price: 79999,
        category: "Television",
        image:
          "https://example.com/images/4k-led-tv.jpg",
      },
      {
        id: "p3",
        name: "Wireless Headphones",
        price: 8999,
        category: "Accessories",
        image:
          "https://example.com/images/wireless-headphones.jpg",
      },
      // Add more products as needed
    ]);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-contain mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{product.category}</p>
            <p className="text-xl font-bold text-indigo-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
