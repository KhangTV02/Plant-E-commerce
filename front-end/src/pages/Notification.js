import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const Notification = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingCancelOrders();
  }, []);

  const fetchPendingCancelOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.pendingOrders.url, {
        method: SummaryApi.pendingOrders.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const responseData = await response.json();
      if (responseData.success) {
        setOrders(responseData.data);
      } else {
        toast.error("Lỗi lấy danh sách đơn hàng chờ hủy!");
      }
    } catch (error) {
      toast.error(`Lỗi hệ thống: ${error.message}`);
    }
    setLoading(false);
  };

  const handleApproveCancel = async (orderId) => {
    try {
      const response = await fetch(`${SummaryApi.updateStatusOrder.url}/${orderId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Hủy đơn hàng" }) // ✅ Chuyển trạng thái thành Hủy đơn hàng
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success("Đã xác nhận hủy đơn hàng!");
        fetchPendingCancelOrders(); // Cập nhật lại danh sách
      } else {
        toast.error("Lỗi khi xác nhận hủy!");
      }
    } catch (error) {
      toast.error("Lỗi hệ thống!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold text-center mb-4">Tất cả thông báo</h2>
        <h2 className="text-lg font-bold text-center mb-4">Các yêu cầu hủy đơn hàng</h2>
      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">Không có yêu cầu hủy đơn nào.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Mã đơn</th>
              <th className="p-2 border">Khách hàng</th>
              <th className="p-2 border">Sản phẩm</th>
              <th className="p-2 border">Tổng tiền</th> 
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order?._id} className="border">
                <td className="p-2 border">{order?._id.slice(-6).toUpperCase()}</td>
                <td className="p-2 border">
                  {order?.userId?.name} <br />
                  <span className="text-gray-500 text-sm">{order?.userId?.email}</span>
                </td>
                <td className="p-2 border">
                  {order?.products.map((item, i) => (
                    <p key={i}>
                      {item.productId?.plantName} x {item?.quantity}
                    </p>
                  ))}
                </td>
                <td className="p-2 border font-semibold">
                  {order?.totalPrice.toLocaleString()} VND
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleApproveCancel(order._id)}
                  >
                    Xác nhận hủy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notification;
