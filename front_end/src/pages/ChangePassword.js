import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icon mắt

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // State để bật/tắt xem mật khẩu
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });

  // Toggle hiển thị mật khẩu
  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(SummaryApi.changePassword.url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Đổi mật khẩu thành công!");
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi đổi mật khẩu!");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-md shadow-lg rounded-lg bg-white mt-12">
      <h2 className="text-xl font-bold text-center mb-4">🔑 Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Mật khẩu cũ */}
        <div className="mb-3 relative">
          <label className="block text-sm font-medium">Mật khẩu cũ</label>
          <input
            type={showPassword.old ? "text" : "password"} // ✅ Toggle mật khẩu
            name="oldPassword"
            className="border p-2 w-full rounded pr-10"
            placeholder="Nhập mật khẩu cũ"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
          <span 
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => togglePassword("old")}
          >
            {showPassword.old ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Mật khẩu mới */}
        <div className="mb-3 relative">
          <label className="block text-sm font-medium">Mật khẩu mới</label>
          <input
            type={showPassword.new ? "text" : "password"} // ✅ Toggle mật khẩu
            name="newPassword"
            className="border p-2 w-full rounded pr-10"
            placeholder="Nhập mật khẩu mới"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <span 
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => togglePassword("new")}
          >
            {showPassword.new ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="mb-3 relative">
          <label className="block text-sm font-medium">Xác nhận mật khẩu</label>
          <input
            type={showPassword.confirm ? "text" : "password"} // ✅ Toggle mật khẩu
            name="confirmPassword"
            className="border p-2 w-full rounded pr-10"
            placeholder="Nhập lại mật khẩu mới"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span 
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => togglePassword("confirm")}
          >
            {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "    Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
