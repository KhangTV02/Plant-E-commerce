const orderModel = require("../../models/orderModel");

const pendingOrders = async (req, res) => {
  try {
    const getpendingOrders = await orderModel
      .find({ status: "Chờ hủy" })
      .populate("userId")
      .populate("products.productId");

    res.status(200).json({
      success: true,
      message: "Danh sách đơn hàng chờ hủy",
      data: getpendingOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách đơn hàng chờ hủy!",
      error: error.message
    });
  }
};

module.exports = pendingOrders;
