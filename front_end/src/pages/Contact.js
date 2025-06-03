import React, { useState } from "react";
import Navbar from "../components/NavBar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  alert("🎉 Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất."); 
  setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
};

  return (
    <div className="container mx-auto text-center">
      <Navbar />
      <div className="pt-14 px-4">
        <h2 className="text-2xl font-bold text-green-600">📞 Liên hệ chúng tôi</h2>
        <p>📍 Địa chỉ: 123 Yên Mô, Thị trấn Phước Long, Bạc Liêu</p>
        <p>📞 Hotline: 0832-723-464</p>
        <p>📧 Email: support@plantshop.com</p>
      </div>

      {/* Form liên hệ */}
      <div className="mt-2 max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">📝 Gửi tin nhắn cho chúng tôi</h3>
        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-2">
            <label className="block text-gray-700">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập họ tên của bạn"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập email của bạn"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700">Nội dung</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập nội dung cần hỗ trợ"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
