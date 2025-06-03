const orderModel = require("../../models/orderModel");
const cartModel = require("../../models/cartProduct");
const productModel = require("../../models/productModel");
// const vnpayHelper = require("../../utils/vnpayHelper");

const placeOrder = async (req, res) => {
    try {
        const { address, phone, productId } = req.body;
        const userId = req.userId;

        if (!address || !phone || !productId) {
            return res.status(400).json({ success: false, message: "Thiếu thông tin đặt hàng!" });
        }

        // Tìm sản phẩm trong giỏ hàng
        const cartItem = await cartModel.findOne({ userId, productId }).populate("productId");

        if (!cartItem) {
            return res.status(400).json({ success: false, message: "Sản phẩm không tồn tại trong giỏ hàng!" });
        }

        const product = cartItem?.productId;
        const price = product?.sellingPrice || product?.price;
        const totalPrice = price * cartItem?.quantity;

        // ✅ Kiểm tra tồn kho
        if (product.stock < cartItem.quantity) {
            return res.status(400).json({ 
                success: false, 
                message: `Sản phẩm "${product?.plantName}" không đủ hàng! Chỉ còn ${product?.stock} sản phẩm.` 
            });
        }

        // ✅ Giảm số lượng tồn kho
        product.stock -= cartItem?.quantity;
        await product.save();

        // ✅ Tạo đơn hàng mới
        const newOrder = new orderModel({
            userId,
            products: [{ productId, quantity: cartItem?.quantity }],
            totalPrice,
            address,
            phone,
            status: "Chờ xử lý",
            // paymentMethod,
        });


        await newOrder.save();

        // ✅ Xóa sản phẩm khỏi giỏ hàng sau khi thanh toán
        await cartModel.deleteOne({ userId, productId });

    //        if (paymentMethod === "VNPay") {
    //   // ✅ Nếu là VNPay, tạo link thanh toán
    //   const paymentUrl = vnpayHelper.createPaymentUrl(newOrder._id, totalPrice);
    //   return res.json({ success: true, paymentUrl });
    // }

        return res.json({
            success: true,
            message: "Đặt hàng thành công!",
            order: newOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Lỗi khi đặt hàng."
        });
    }
};

module.exports = placeOrder;
