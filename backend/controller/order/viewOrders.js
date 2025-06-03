const orderModel = require("../../models/orderModel");

const viewOrders = async (req, res) => {
  try {
    const userId = req.userId; // Lấy `userId` từ token đăng nhập

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Bạn chưa đăng nhập!",
      });
    }

    const orders = await orderModel
      .find({ userId })
      .populate("products.productId");

    res.json({
      success: true,
      data: orders,
      message: "Lấy danh sách đơn hàng thành công!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ!",
    });
  }
};

module.exports = viewOrders;
