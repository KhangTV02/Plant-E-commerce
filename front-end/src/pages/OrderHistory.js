import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"; // Lấy user từ Redux
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user); // Lấy user từ Redux

  useEffect(() => {
    if (user?._id) {
      fetchOrderHistory(user._id);
    }
  }, [user]);

  const fetchOrderHistory = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.completeOrders.url}?userId=${userId}`, {
        method: SummaryApi.completeOrders.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const responseData = await response.json();
      console.log("🚀 Orders Data:", responseData);
      if (responseData.success) {
        setOrders(responseData.data);
        setTotalSpent(responseData.totalSpent);
      } else {
        toast.error(responseData.message || "Lỗi khi tải lịch sử đơn hàng!");
      }
    } catch (error) {
      toast.error("Lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Lịch sử mua hàng</h2>
      <p className="text-center text-xl font-semibold text-green-600">
        Tổng tiền: {displayINRCurrency(totalSpent)}
      </p>

      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : orders.length === 0 ? (
        <p className="text-center">Bạn chưa có đơn hàng nào đã giao.</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Mã đơn</th>
              <th className="p-2 border">Sản phẩm</th>
              <th className="p-2 border">Tổng tiền</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Ngày đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order?._id} className="border">
                <td className="p-2 border text-center">
                  {order?._id.slice(-6)}
                </td>
                <td className="p-2 border">
                  {order?.products.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={item?.productId?.plantImage[0]}
                        alt={item?.productId?.plantName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <p>
                        {item?.productId?.plantName} x {item?.quantity}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="p-2 border font-semibold">
                  {displayINRCurrency(order?.totalPrice)}
                </td>
                <td className="p-2 border font-semibold">
                  {order?.status} thành công
                </td>
                <td className="p-2 border">
                  {new Date(order?.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
