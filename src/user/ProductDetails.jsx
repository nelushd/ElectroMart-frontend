import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Product fetch failed", err));
  }, [id]);

  if (!product) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 shadow rounded mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image?.[0] || "/default.png"}
          alt={product.name}
          className="w-full h-auto rounded"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-green-700 mb-2">Rs. {product.price}</p>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-sm"><strong>Dimensions:</strong> {product.dimension}</p>
          <p className="text-sm"><strong>Category:</strong> {product.category}</p>
          <p className="text-sm"><strong>Status:</strong> {product.availability ? "In stock" : "Out of stock"}</p>

          <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
