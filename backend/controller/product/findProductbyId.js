
// const ProductModel = require('../models/productModel');


// const getProductById = async(req,res)=>{
//     try {
//        const { productId } = req.body
//        const product = await ProductModel.findById(req.productId)

//        res.json({
//             data : product,
//             message : "Ok",
//             success : true,
//             error : false
//         })

//         res.status(200).json({ success: true, data: product });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Lỗi server' });
//     }
// }

// module.exports = getProductById
