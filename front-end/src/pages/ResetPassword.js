import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const ResetPassword = () => {
  const { token } = useParams(); // Lấy token từ URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Gửi yêu cầu đặt lại mật khẩu bằng fetch
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔹 Token gửi đi:", token);
      const response = await fetch(`${SummaryApi.resetPassword.url}/${token}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Mật khẩu đã được cập nhật thành công!");
        navigate("/login"); // Chuyển hướng về trang đăng nhập
      } else {
        toast.error(responseData.message || "Lỗi khi đặt lại mật khẩu!");
      }
    } catch (error) {
      toast.error("Lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-12">
      <h2 className="text-2xl font-bold text-center mb-4">🔑 Đặt lại mật khẩu</h2>
      <form className="max-w-md mx-auto" onSubmit={handleResetPassword}>
        <div className="mb-4">
          <label className="block text-gray-700">Mật khẩu mới</label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* ✅ Bật/tắt xem mật khẩu */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword" className="ml-2">Hiển thị mật khẩu</label>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Xác nhận"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
