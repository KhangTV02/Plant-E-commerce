const express = require('express');

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails');
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')

const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
// const getProductById = require('../controller/product/findProductbyId');
// const { default: CategoryWiseProductDisplay } = require('../../front-end/src/components/CategoryWiseProductDisplay');
const orderController = require('../controller/order/orderController');
const allOrders = require('../controller/order/allOrders');
const updateStatusOrder = require('../controller/order/updateStatusOrder');
const placeAllOrders = require('../controller/order/placeAllOrders');
const { getOrderStatistics, getRevenueStatistics } = require('../controller/order/statistics');
const changePassword = require('../controller/user/changePassword');
const forgotPassword = require('../controller/user/forgotPasswordController');
const resetPassword = require('../controller/user/resetPasswordController');
const viewOrders = require('../controller/order/viewOrders');
const cancelOrder = require('../controller/order/cancelOrder');
const pendingOrders = require('../controller/order/pendingOrders');
const countPendingOrders = require('../controller/order/countPendingOrders');
const completedOrders = require('../controller/order/completeOrder');
const updateStatusPayment = require('../controller/order/updateStatusPayment');
const deleteProduct = require('../controller/product/deleteProduct');
const restoreProduct = require('../controller/product/restoreProduct');




router.post("/signup", userSignUpController)

router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/user-Logout", userLogout)
router.put("/change-password", authToken, changePassword)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)


// product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/product-details", getProductDetails)
router.post("/delete-product", deleteProduct)
router.post("/restore-product", authToken, restoreProduct)


// add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-cart-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)
router.get("/search",searchProduct)
// router.get('/getProductById',getProductById)

// order 
router.post("/order", authToken, orderController)
router.get("/all-orders", authToken, allOrders)

router.put("/update-status-order/:orderId", authToken, updateStatusOrder)
router.post("/placeAllOrders", authToken, placeAllOrders)

router.get("/order-statistics", authToken, getOrderStatistics)
router.get("/revenue-statistics", authToken, getRevenueStatistics)
router.get("/view-orders", authToken, viewOrders)
router.post("/cancel-order/:orderId", authToken, cancelOrder)
router.get("/pending-order", authToken, pendingOrders)
router.get("/pending-count-order", authToken, countPendingOrders);
router.get("/complete-orders", authToken, completedOrders);
router.put("/update-status-payment/:orderId", authToken, updateStatusPayment)



module.exports = router