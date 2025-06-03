const orderModel = require("../../models/orderModel");
const addToCartModel = require("../../models/cartProduct");
const vnpayHelper = require("../../utils/vnpayHelper");
const placeAllOrders = async (req, res) => {
    try {
        const { address, phone } = req.body;
        const userId = req.userId; // Lấy ID của người dùng từ token

        if (!address || !phone) {
            return res.status(400).json({ success: false, message: "Thiếu thông tin đặt hàng!" });
        }

        // Lấy tất cả sản phẩm trong giỏ hàng của người dùng
        const cartItems = await addToCartModel.find({ userId }).populate("productId");

        if (!cartItems.length) {
            return res.status(400).json({ success: false, message: "Giỏ hàng trống!" });
        }

        // Chuyển danh sách sản phẩm thành danh sách đặt hàng
        const products = cartItems.map(item => ({
            productId: item.productId?._id,
            quantity: item.quantity,
            price: (item.productId?.sellingPrice || item.productId?.price) * item.quantity
        }));

        // Tính tổng giá trị đơn hàng
        const totalPrice = products.reduce((sum, item) => sum + item?.price, 0);

        // Lưu đơn hàng vào database
        const newOrder = new orderModel({
            userId,
            products,
            totalPrice,
            address,
            phone,
            status: "Chờ xử lý"
        });

        await newOrder.save();

        // Xóa toàn bộ sản phẩm trong giỏ hàng sau khi đặt hàng thành công
        await addToCartModel.deleteMany({ userId });

        return res.json({
            success: true,
            message: "Thanh toán tất cả sản phẩm thành công!",
            order: newOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Lỗi khi đặt hàng."
        });
    }
};

module.exports = placeAllOrders;
