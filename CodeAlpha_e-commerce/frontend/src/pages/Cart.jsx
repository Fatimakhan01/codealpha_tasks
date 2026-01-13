import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0)
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/" className="text-blue-600 underline">Go to Products</Link>
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between items-center border p-3 rounded">
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p>${item.price} x {item.qty}</p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="font-bold text-xl">Total: ${total}</p>
        <div className="space-x-2">
          <button
            onClick={clearCart}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
