const productModel = require('../../models/productModel');

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body; // Lấy productId từ body

        if (!productId) {
            return res.status(400).json({
                message: "Thiếu ID sản phẩm!",
                success: false,
                error: true
            });
        }

        // Cập nhật trạng thái isDeleted thay vì xóa thật
        const deletedProduct = await productModel.findByIdAndUpdate(
            productId,
            { isDeleted: true },
            { new: true }
        );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Sản phẩm không tồn tại!",
                success: false,
                error: true
            });
        }

        res.json({
            message: "Đã đánh dấu sản phẩm là đã xóa!",
            data: deletedProduct,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Lỗi khi xóa sản phẩm:", err);
        res.status(500).json({
            message: "Lỗi máy chủ, vui lòng thử lại!",
            error: true,
            success: false
        });
    }
};

module.exports = deleteProduct;
