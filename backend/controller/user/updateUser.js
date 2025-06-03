const userModel = require("../../models/userModel");

async function updateUser(req, res) {
  try {
    console.log("📥 Dữ liệu nhận từ Frontend:", req.body);
    const sessionUser = req.userId;

    const { userId, email, name, role, phone, address, profilePic } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
      ...(phone && { phone: phone }), // Thêm số điện thoại
      ...(address && { address: address }),
      ...(profilePic && { profilePic: profilePic })
    };

    console.log("📤 Payload gửi đến MongoDB:", payload);

    const user = await userModel.findById(sessionUser);

    console.log("user.role", user.role);

    const updateUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true
    });

    res.json({
      data: updateUser,
      message: "Chỉnh sửa thành công",
      success: true,
      error: false
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = updateUser;
