const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params; // 🛠 Nhận token từ URL
    console.log("🔹 Token nhận từ frontend:", token);

    // 🟢 Giải mã token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    } catch (error) {
      return res.status(400).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn!" });
    }

    // 🟢 Tìm user dựa trên _id đã giải mã
    const user = await userModel.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(400).json({ success: false, message: "Không tìm thấy người dùng!" });
    }

    // 🟢 Hash mật khẩu mới và cập nhật vào database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    console.log("✅ Mật khẩu đã được cập nhật cho user:", user.email);

    res.json({ success: true, message: "Mật khẩu đã được cập nhật thành công!" });
  } catch (error) {
    console.error("❌ Lỗi khi đặt lại mật khẩu:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ!" });
  }
};

module.exports = resetPassword;
