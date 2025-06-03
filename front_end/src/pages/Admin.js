import React, { useEffect, useState } from "react";
import "../App.css";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import SummaryApi from "../common";
import ROLE from "../common/role";
const Admin = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [pendingCancelCount, setPendingCancelCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    fetchPendingCancelCount();
     const interval = setInterval(() => {
        fetchPendingCancelCount();
     }, 5000);
     return () => clearInterval(interval);
  }, []);

  const fetchPendingCancelCount = async () => {
    try {
      const response = await fetch(SummaryApi.pendingCountOrders.url, {
        method: SummaryApi.pendingCountOrders.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const responseData = await response.json();
      if (responseData.success) {
        setPendingCancelCount(responseData.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy số lượng đơn hàng chờ hủy:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] lg:flex hidden pt-12">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-3xl cursor-pointer relative flex justify-center">
            {user ? (
              user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-20 rounded-full mt-3"
                  alt={user?.name}
                />
              ) : (
                <span className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              )
            ) : (
              <FaRegCircleUser className="w-20 h-20 rounded-full" />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        {/***navigation */}
        <div>
          <nav className="grid p-4 gap-y-2">
            <Link
              to="all-products"
              className={`px-2 py-1 hover:bg-green-500 rounded ${
                location.pathname.includes("all-products") ? "bg-green-500" : ""
              }`}
            >
              Quản lý sản phẩm
            </Link>
            <Link
              to="all-users"
              className={`px-2 py-1 hover:bg-green-500 rounded ${
                location.pathname.includes("all-users") ? "bg-green-500" : ""
              }`}
            >
              Quản lý người dùng
            </Link>

            <Link
              to="all-orders"
              className={`px-2 py-1 hover:bg-green-500 rounded ${
                location.pathname.includes("all-orders") ? "bg-green-500" : ""
              }`}
            >
              Quản lý đơn hàng
            </Link>
            <Link
              to="Statistics"
              className={`px-2 py-1 hover:bg-green-500 rounded ${
                location.pathname.includes("Statistics") ? "bg-green-500" : ""
              }`}
            >
              Thống kê
            </Link>
            <Link
              to="pending-orders"
              className={`px-2 py-1 hover:bg-green-500 rounded relative ${
                location.pathname.includes("pending-orders") ? "bg-green-500" : ""
              }`}
            >
              Xác nhận yêu cầu
              {pendingCancelCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {pendingCancelCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
