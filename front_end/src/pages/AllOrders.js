import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("all"); // Mặc định là hôm nay

  useEffect(() => {
    fetchOrders();
  }, [timeRange]);

  // 📌 Lấy danh sách đơn hàng từ server
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.allOrders.url}?timeRange=${timeRange}`,
        {
          method: SummaryApi.allOrders.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        }
      );

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.success) {
        setOrders(responseData.data);
      } else {
        toast.error("Lỗi lấy danh sách đơn hàng");
      }
    } catch (error) {
      toast.error(`Không thể tải danh sách đơn hàng! Lỗi: ${error.message}`);
    }
    setLoading(false);
  };

  // 📌 Xử lý khi chọn trạng thái mới
  const handleStatusChange = async (orderId, newStatus) => {
    if (!newStatus) {
      toast.error("Vui lòng chọn trạng thái trước khi xác nhận.");
      return;
    }

    try {
      const response = await fetch(
        `${SummaryApi.updateStatusOrder.url}/${orderId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status: newStatus })
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(`Trạng thái đơn hàng đã cập nhật thành "${newStatus}"!`);

        // ✅ Cập nhật trạng thái ngay trên UI mà không cần reload
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái!");
    }
  };

  const handlePaymentStatusChange = async (orderId, newPaymentStatus) => {
    if (!newPaymentStatus) {
      toast.error("Vui lòng chọn trạng thái thanh toán trước khi xác nhận.");
      return;
    }

    try {
      const response = await fetch(
        `${SummaryApi.updateStatusPayment.url}/${orderId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ paymentStatus: newPaymentStatus })
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(
          `Trạng thái thanh toán cập nhật thành "${newPaymentStatus}"!`
        );

        // ✅ Cập nhật UI mà không cần reload
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, paymentStatus: newPaymentStatus }
              : order
          )
        );
      } else {
        toast.error("Cập nhật trạng thái thanh toán thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái thanh toán!");
    }
  };
  
  // 📌 Hàm format mã đơn hàng đẹp hơn
  const formatOrderId = (orderId) => {
    return `${orderId.slice(-6).toUpperCase()}`;
  };

  // 📌 Chuyển định dạng thời gian
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-2"> Quản lý đơn hàng</h2>

      {/* Dropdown chọn thời gian */}
      <div className="mb-2">
        <label className="font-medium mr-2">Lọc theo:</label>
        <select
          className="border p-2 rounded"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="today">Hôm nay</option>
          <option value="yesterday">Hôm qua</option>
          <option value="lastWeek">Tuần trước</option>
          <option value="lastMonth">Tháng trước</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Mã đơn</th>
              <th className="p-2 border">Khách hàng</th>
              <th className="p-2 border">Số điện thoại</th>
              <th className="p-2 border">Địa chỉ</th>
              <th className="p-2 border">Tổng tiền</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Thanh toán</th>
              <th className="p-2 border">Thời gian</th>              
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="border">
                <td className="p-2 border font-semibold">
                  {formatOrderId(order._id)}
                </td>
                <td className="p-2 border">
                  {order.userId.name} <br />
                  <span className="text-gray-500 text-sm">
                    {order.userId.email}
                  </span>
                </td>
                <td className="p-2 border">{order.phone}</td>
                <td className="p-2 border">{order.address}</td>
                <td className="p-2 border font-semibold">
                  {order.totalPrice.toLocaleString()} VND
                </td>
                <td className="p-2 border">
                  <select
                    className="border p-1"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Chờ xử lý">Chờ xử lý</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Hủy đơn hàng">Hủy đơn hàng</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select
                    className="border p-1"
                    value={order.paymentStatus}
                    onChange={(e) =>
                      handlePaymentStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Đã thanh toán">Đã thanh toán</option>
                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                  </select>
                </td>
                <td className="p-2 border text-center">
                  {formatDate(order?.createdAt)}
                </td>{" "}                          
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageOrders;
