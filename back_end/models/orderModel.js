const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Chờ xử lý', 'Đang giao', 'Đã giao', 'Hủy đơn hàng','Chờ hủy'],
        default: 'Chờ xử lý'
    },
    paymentStatus: {
        type: String,
        enum: ['Chưa thanh toán', 'Đã thanh toán'],
        default: 'Chưa thanh toán'
    },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
