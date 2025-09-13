const orderModel = require("../../models/orderModel");

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

    console.log("Yêu cầu hủy đơn hàng:", { orderId, userId });

    // Tìm đơn hàng của người dùng
    const order = await orderModel.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại!" });
    }

    // Kiểm tra nếu đơn hàng đã bị xử lý hoặc đã giao thì không thể hủy
    if (order.status !== "Chờ xử lý") {
      return res.status(400).json({ success: false, message: "Không thể hủy đơn hàng ở trạng thái hiện tại!" });
    }

    // Chuyển trạng thái sang "Chờ hủy"
    order.status = "Chờ hủy";
    await order.save();

    res.json({ success: true, message: "Yêu cầu hủy đơn hàng đã được gửi!" });
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu hủy đơn hàng:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ!" });
  }
};


module.exports = cancelOrder;
