import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../services/api";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token"); 

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place order");
      return;
    }

    const orderData = {
      userId: user._id,
      items: cartItems.map(item => ({
        product: item._id,
        title: item.name, 
        price: item.price,
        quantity: item.qty
      })),
      totalPrice: total
    };

    try {
      const res = await placeOrder(orderData, token);
      console.log("ORDER RESPONSE:", res.data);
      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("ORDER ERROR:", err.response?.data || err.message);
      alert("Failed to place order. Please try again.");
    }
  };

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul className="space-y-2">
        {cartItems.map((item) => (
          <li key={item._id} className="flex justify-between border p-2 rounded">
            <span>{item.name} x {item.qty}</span>
            <span>${item.price * item.qty}</span>
          </li>
        ))}
      </ul>
      <p className="font-bold text-xl mt-4">Total: ${total}</p>
      <button
        onClick={handlePlaceOrder}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
