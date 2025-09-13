import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const AdminDashboard = () => {
  const [orderStats, setOrderStats] = useState({});
  const [revenueStats, setRevenueStats] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderStatistics();
    fetchRevenueStatistics();
  }, []);

  const fetchOrderStatistics = async () => {
  try {
    const response = await fetch(SummaryApi.getOrderStatistics.url, {
      method: SummaryApi.getOrderStatistics.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Lỗi HTTP! Status: ${response.status}`);
    }

    const responseData = await response.json();
    if (responseData.success) {
      setOrderStats(responseData.data); // ✅ Chỉ gán thống kê đơn hàng
    } else {
      toast.error("Lỗi lấy thống kê đơn hàng!");
    }
  } catch (error) {
    toast.error(`Không thể tải thống kê đơn hàng! Lỗi: ${error.message}`);
  }
};

 
  const fetchRevenueStatistics = async () => {
    try {
      const response = await fetch(SummaryApi.getRevenueStatistics.url, {
        method: SummaryApi.getRevenueStatistics.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.success) {
        setRevenueStats(responseData.data);
        setMonthlyRevenue(responseData.data.monthlyRevenue || []);
      } else {
        toast.error("Lỗi lấy thống kê doanh thu!");
      }
    } catch (error) {
      toast.error(`Không thể tải thống kê doanh thu! Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const revenueChartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12"
    ],
    datasets: [
      {
        label: "Doanh thu (VND)",
        data:
          monthlyRevenue.length === 12
            ? monthlyRevenue
            : [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200], 
        backgroundColor: "rgba(75, 192, 192, 0.6)", 
        borderColor: "rgba(75, 192, 192, 1)", 
        borderWidth: 1
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Thống kê</h2>
      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
          <div className="border p-2 bg-white rounded-lg shadow">
            <h3 className="text-2xl font-bold">Thống kê đơn hàng</h3>
            <p className="text-lg p-2">
              {" "}
              Tổng số đơn hàng: {orderStats?.totalOrder || 0}
            </p>
            <p className="text-lg p-2">
              {" "}
              Đơn hàng hoàn thành: {orderStats?.completed || 0}
            </p>
            <p className="text-lg p-2">
              {" "}
              Đơn hàng đang xử lý: {orderStats?.processing || 0}
            </p>
            <p className="text-lg p-2">
              {" "}
              Đơn hàng bị hủy: {orderStats?.cancelled || 0}
            </p>
            <p className="text-lg p-2">
              Giá trị trung bình: {orderStats?.avgValue?.toLocaleString()} VND
            </p>
            <p className="text-xl p-2">
              Tỷ lệ thành công: {orderStats?.successRate || 0}%
            </p>
          </div>

          {/* Thống kê doanh thu */}
          <div className="border p-2 rounded-lg shadow bg-white">
            <h3 className="text-2xl font-bold"> Thống kê doanh thu</h3>
            <p className="text-lg p-2">
              Hôm nay: {revenueStats?.today?.toLocaleString() || 0} VND
            </p>
            <p className="text-lg p-2">
              Tuần này: {revenueStats?.week?.toLocaleString() || 0} VND
            </p>
            <p className="text-lg p-2">
              Tháng này: {revenueStats?.month?.toLocaleString() || 0} VND
            </p>
            <p className="text-lg p-2">
              Năm nay: {revenueStats?.year?.toLocaleString() || 0} VND
            </p>
          </div>
        </div>
      )}
     
      {!loading && (
        <div className="w-[720px] bg-white mt-6 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4 text-center">
            📊 Doanh thu theo tháng
          </h3>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
          <Bar data={revenueChartData} />
        </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
