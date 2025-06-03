const orderModel = require("../../models/orderModel");

const completedOrders = async (req, res) => {
  try {
    const userId = req.user?._id || req.query.userId; // Lấy userId từ req.user (JWT) hoặc từ query params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu userId, không thể lấy lịch sử đơn hàng!"
      });
    }

    const orders = await orderModel
      .find({ userId, status: "Đã giao" })
      .populate("userId")
      .populate("products.productId");

    const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.status(200).json({
      success: true,
      message: "Lịch sử đơn hàng đã giao",
      data: orders,
      totalSpent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy lịch sử đơn hàng!",
      error: error.message
    });
  }
};

module.exports = completedOrders;
