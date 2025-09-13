const orderModel = require("../../models/orderModel");

const updateStatusPayment = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const { orderId } = req.params;

    // ✅ Kiểm tra giá trị hợp lệ
    if (!["Chưa thanh toán", "Đã thanh toán"].includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái thanh toán không hợp lệ!",
      });
    }

    // ✅ Cập nhật trạng thái thanh toán
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng!" });
    }

    res.json({
      success: true,
      message: "Cập nhật trạng thái thanh toán thành công!",
      order,
    });
  } catch (err) {
    console.error("Lỗi cập nhật trạng thái thanh toán:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi máy chủ khi cập nhật thanh toán!" });
  }
};

module.exports = updateStatusPayment;
