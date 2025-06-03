import React, { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Gửi yêu cầu quên mật khẩu bằng fetch
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Vui lòng kiểm tra email để đặt lại mật khẩu!");
        setEmail("");
      } else {
        toast.error(responseData.message || "Lỗi khi gửi email!");
      }
    } catch (error) {
      toast.error("Lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-12">
      <h2 className="text-2xl font-bold text-center mb-4">🔑 Quên mật khẩu</h2>
      <h2 className="text-sm font-bold text-center mb-4 text-red-600">Vui lòng nhập đúng email để đặt lại mật khẩu !</h2>
      <form className="max-w-md mx-auto" onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label className="block text-gray-700">Nhập Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Gửi"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
