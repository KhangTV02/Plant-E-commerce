const orderModel = require("../../models/orderModel");

const allOrders = async (req, res) => {
  try {
    const { timeRange } = req.query;
    let filter = {};

    if (timeRange) {
      const now = new Date();
      let startDate, endDate;

      switch (timeRange) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0)); // Hôm nay 00:00:00
          endDate = new Date(); // Hiện tại
          break;
        case "yesterday":
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);

          endDate = new Date(startDate);
          endDate.setHours(23, 59, 59, 999);
          break;
        case "lastWeek":
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7); // 7 ngày trước
          startDate.setHours(0, 0, 0, 0);

          endDate = new Date();
          endDate.setDate(endDate.getDate() - 1); // Loại bỏ hôm nay
          endDate.setHours(23, 59, 59, 999);
          break;
        case "lastMonth":
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1); // Tháng trước
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0);

          endDate = new Date();
          endDate.setDate(0); // Ngày cuối của tháng trước
          endDate.setHours(23, 59, 59, 999);
          break;
        default:
          startDate = null;
      }

      if (startDate && endDate) {
        filter.createdAt = { $gte: startDate, $lte: endDate };
      } else if (startDate) {
        filter.createdAt = { $gte: startDate };
      }
    }

    const orders = await orderModel
      .find(filter)
      .populate("userId")
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: orders,
      success: true,
      error: false,
      message: "Danh sách đơn hàng"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Lỗi khi lấy danh sách đơn hàng",
      success: false,
      error: true
    });
  }
};

module.exports = allOrders;
