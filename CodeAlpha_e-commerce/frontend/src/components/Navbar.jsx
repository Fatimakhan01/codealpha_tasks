import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext) || { cartItems: [] };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center ">
      <div className="text-xl font-bold">
        <Link to="/">E-Shop</Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
