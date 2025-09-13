const nodemailer = require("nodemailer");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email gửi
    pass: process.env.EMAIL_PASS  // Mật khẩu ứng dụng từ Google
  }
});

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Email không tồn tại trong hệ thống!" });
    }

    // Tạo JWT token cho đặt lại mật khẩu (hết hạn sau 1 giờ)
    const resetToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" } // Token hết hạn sau 1 giờ
    );

    // Lưu token vào database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
    await user.save(); 

    console.log("✅ Token đã lưu vào user:", resetToken);

    // Tạo link đặt lại mật khẩu
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // Gửi email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Đặt lại mật khẩu",
      html: `<p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấp vào liên kết sau để tiếp tục:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email gửi thành công:", resetLink);

    res.json({ success: true, message: "Email đặt lại mật khẩu đã được gửi!" });
  } catch (error) {
    console.error("Lỗi quên mật khẩu:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ!" });
  }
};

module.exports = forgotPassword;
