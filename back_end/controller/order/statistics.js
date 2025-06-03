const orderModel = require("../../models/orderModel");

// API lấy thống kê đơn hàng
const getOrderStatistics = async (req, res) => {
  try {
    // 📌 Đếm số lượng đơn hàng theo trạng thái
    const totalOrder = await orderModel.countDocuments({});
    const completedOrders = await orderModel.countDocuments({
      status: "Đã giao"
    });
    const processingOrders = await orderModel.countDocuments({
      status: "Chờ xử lý"
    });
    const cancelledOrders = await orderModel.countDocuments({
      status: "Hủy đơn hàng"
    });

    // 📌 Tính giá trị trung bình của mỗi đơn hàng
    const allOrders = await orderModel.find({});
    const totalRevenue = allOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    let avgValue = totalOrder > 0 ? totalRevenue / totalOrder : 0;
    avgValue = Math.round(avgValue / 1000) * 1000; // 🔥 Làm tròn theo phần nghìn

    // 📌 Tính tỷ lệ đơn hàng thành công
    const successRate =
      totalOrder > 0 ? ((completedOrders / totalOrder) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        totalOrder,
        completed: completedOrders,
        processing: processingOrders,
        cancelled: cancelledOrders,
        avgValue,
        successRate
      }
    });
  } catch (error) {
    console.error("Lỗi lấy thống kê đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ khi lấy thống kê đơn hàng!"
    });
  }
};


const getRevenueStatistics = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const revenueToday = await orderModel.aggregate([
      { $match: { createdAt: { $gte: startOfDay } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const revenueWeek = await orderModel.aggregate([
      { $match: { createdAt: { $gte: startOfWeek } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const revenueMonth = await orderModel.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const revenueYear = await orderModel.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    // 📊 Tính doanh thu theo từng tháng
    const monthlyRevenue = await orderModel.aggregate([
      {
        $match: { createdAt: { $gte: startOfYear } }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalPrice" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    let monthlyRevenueData = Array(12).fill(0);
    monthlyRevenue.forEach((item) => {
      monthlyRevenueData[item._id - 1] = item.total;
    });

    res.json({
      success: true,
      data: {
        today: revenueToday[0]?.total || 0,
        week: revenueWeek[0]?.total || 0,
        month: revenueMonth[0]?.total || 0,
        year: revenueYear[0]?.total || 0,
        monthlyRevenue: monthlyRevenueData
      }
    });
  } catch (error) {
    console.error("Lỗi lấy thống kê doanh thu:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ khi lấy thống kê doanh thu!"
    });
  }
};

module.exports = { getOrderStatistics, getRevenueStatistics };
