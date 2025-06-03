const productModel = require('../../models/productModel');

const restoreProduct = async (req, res) => {
  try {
    const { productId } = req.body; // Lấy productId từ body

    if (!productId) {
      return res.status(400).json({
        message: "Thiếu ID sản phẩm!",
        success: false,
        error: true
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { isDeleted: false },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại!",
        success: false,
        error: true
      });
    }

    res.json({
      message: "Khôi phục sản phẩm thành công!",
      data: updatedProduct,
      success: true,
      error: false
    });

  } catch (err) {
    res.status(500).json({
      message: "Lỗi máy chủ, vui lòng thử lại!",
      error: true,
      success: false
    });
  }
};

module.exports = restoreProduct;
