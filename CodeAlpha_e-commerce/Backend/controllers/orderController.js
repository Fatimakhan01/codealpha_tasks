import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    console.log("ORDER API HIT");
    console.log("BODY:", req.body);

    const { user, userId, items, totalPrice } = req.body;
    const finalUser = user || userId;

    if (!finalUser) {
      return res.status(400).json({ message: "User is required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    if (!totalPrice) {
      return res.status(400).json({ message: "Total price is required" });
    }

    const formattedItems = items.map(item => ({
      product: item.product || item.productId,
      title: item.title || item.name || "",
      price: item.price,
      quantity: item.quantity || item.qty || 1
    }));

    const order = new Order({
      user: finalUser,
      items: formattedItems,
      totalPrice,
      status: "pending"
    });

    const savedOrder = await order.save();
    console.log("ORDER SAVED:", savedOrder._id);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });

  } catch (error) {
    console.error("ORDER ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("items.product", "title price")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
};
