import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
        <h2 className="mt-2 font-semibold">{product.name}</h2>
        <p className="text-blue-600 font-bold">${product.price}</p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-600 text-white w-full py-1 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
