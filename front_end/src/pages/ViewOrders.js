import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  // 📌 Gọi API để lấy danh sách đơn hàng của người dùng
  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.viewOrders.url, {
        method: SummaryApi.viewOrders.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const responseData = await response.json();
      if (responseData.success) {
        setOrders(responseData.data);
      } else {
        toast.error("Lỗi khi tải danh sách đơn hàng!");
      }
    } catch (error) {
      toast.error("Lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  const requestCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${SummaryApi.cancelOrder.url}/${orderId}`, {
        method: SummaryApi.cancelOrder.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success("Yêu cầu hủy đơn hàng đã được gửi!");
        fetchUserOrders(); // Cập nhật lại danh sách đơn hàng
      } else {
        toast.error(responseData.message || "Không thể gửi yêu cầu hủy!");
      }
    } catch (error) {
      toast.error("Lỗi khi gửi yêu cầu hủy!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold text-center mb-4">
        📦 Đơn hàng của tôi
      </h2>
      <div className="font-bold italic text-sm text-center">
        *Lưu ý: đơn hàng sẽ được giao đến nơi khoảng 3-5 ngày kể từ ngày đặt
        hàng !
      </div>
      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : orders.length === 0 ? (
        <p className="text-center">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Mã đơn</th>
              <th className="p-2 border">Sản phẩm</th>
              <th className="p-2 border">Địa chỉ</th>
              <th className="p-2 border">Số điện thoại</th>
              <th className="p-2 border">Tổng tiền</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border">
                <td className="p-2 border text-center">
                  {order._id.slice(-6)}
                </td>
                <td className="p-2 border">
                  {order.products.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={item?.productId?.plantImage[0]}
                        alt={item?.productId?.plantName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <p>
                        {item?.productId?.plantName} x {item.quantity}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="p-2 border">{order?.address}</td>
                <td className="p-2 border">{order?.phone}</td>
                <td className="p-2 border font-semibold">
                  {displayINRCurrency(order?.totalPrice)}
                </td>
                <td className="p-2 border">{order?.status}</td>
                <td className="p-2 border">
                  {order.status === "Chờ xử lý" && (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => requestCancelOrder(order._id)}
                    >
                      Hủy đặt hàng
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewOrders;
