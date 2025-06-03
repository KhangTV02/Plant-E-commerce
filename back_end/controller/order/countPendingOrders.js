const orderModel = require("../../models/orderModel");

const countPendingOrders = async (req, res) => {
  try {
    const count = await orderModel.countDocuments({ status: "Chờ hủy" });

    res.status(200).json({
      success: true,
      message: "Số lượng đơn hàng chờ hủy",
      data: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy số lượng đơn hàng chờ hủy!",
      error: error.message
    });
  }
};

module.exports = countPendingOrders;
