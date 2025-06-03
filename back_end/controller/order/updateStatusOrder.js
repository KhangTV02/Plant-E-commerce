const orderModel = require("../../models/orderModel");
const cartModel = require("../../models/cartProduct");

const updateStatusOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    res.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      order
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi cập nhật trạng thái" });
  }
};

module.exports = updateStatusOrder;
