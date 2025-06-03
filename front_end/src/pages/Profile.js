import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import imagetobase64 from "../helpers/imageTobase64"; // Chuyển ảnh sang base64

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    profilePic: ""
  });

  // 🔍 Fetch thông tin người dùng
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(SummaryApi.current_user.url, {
          withCredentials: true
        });

        if (response.data.success) {
          setUser(response.data.data);
          setFormData({
            phone: response.data.data.phone || "",
            address: response.data.data.address || "",
            profilePic: response.data.data.profilePic || ""
          });
        }
      } catch (error) {
        toast.error("Lỗi khi lấy thông tin người dùng!");
      }
    };

    fetchUser();
  }, []);

  // 📝 Cập nhật dữ liệu khi nhập input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 📤 Gửi dữ liệu cập nhật lên server
  const handleUpdate = async (field) => {
    setLoading(true);
    try {
      const response = await axios.post(
        SummaryApi.updateUser.url,
        { userId: user._id, [field]: formData[field] },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Cập nhật thành công!");
        setUser((prev) => ({ ...prev, [field]: formData[field] }));
        setEditField(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật!");
    }
    setLoading(false);
  };

  // 📸 Xử lý tải ảnh lên
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageBase64 = await imagetobase64(file);
    setFormData({ ...formData, profilePic: imageBase64 });

    // Cập nhật ngay ảnh trên UI
    setUser((prev) => ({ ...prev, profilePic: imageBase64 }));

    // Gửi dữ liệu lên server
    setLoading(true);
    try {
      const response = await axios.post(
        SummaryApi.updateUser.url,
        { userId: user._id, profilePic: imageBase64 },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Ảnh đại diện cập nhật thành công!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật ảnh đại diện!");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold text-center p-6">Thông tin tài khoản</h2>
      {user ? (
        <div className="max-w-2xl bg-white mx-auto shadow-md p-4 rounded-lg">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto">
              <label className="cursor-pointer relative inline-block">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto border border-gray-400"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto border border-gray-400">
                    <span className="text-xl">{user.name.charAt(0)}</span>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleUploadPic}
                />
              </label>
              <button
                className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-700"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                Thay đổi ảnh
              </button>
            </div>

            <h3 className="text-xl font-semibold mt-4">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="mt-4">
            {/* 🔹 Hiển thị số điện thoại */}
            <div className="flex items-center justify-between border-b py-2">
              <span className="text-gray-600">Số điện thoại:</span>
              {editField === "phone" ? (
                <div className="flex flex-col w-full gap-2">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  <button
                    onClick={() => handleUpdate("phone")}
                    className="bg-green-600 text-white px-2 py-1 rounded w-full"
                    disabled={loading}
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <span>{user.phone || "Chưa có"}</span>
              )}
              <button
                onClick={() => setEditField("phone")}
                className="text-blue-600 text-sm"
              >
                {user.phone ? "Sửa" : "Thêm"}
              </button>
            </div>

            {/* 🔹 Hiển thị địa chỉ */}
            <div className="flex items-center justify-between border-b py-2">
              <span className="text-gray-600">Địa chỉ:</span>
              {editField === "address" ? (
                <div className="flex flex-col w-full gap-2">
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border p-2 rounded w-full resize-none"
                    rows="3"
                  ></textarea>
                  <button
                    onClick={() => handleUpdate("address")}
                    className="bg-green-600 text-white px-2 py-1 rounded w-full"
                    disabled={loading}
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <span>{user.address || "Chưa có"}</span>
              )}
              <button
                onClick={() => setEditField("address")}
                className="text-blue-600 text-sm"
              >
                {user.address ? "Sửa" : "Thêm"}
              </button>
            </div>
            <div className="text-center pt-4">Ngày tạo: {new Date(user.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      ) : (
        <p className="text-center">Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

export default Profile;
