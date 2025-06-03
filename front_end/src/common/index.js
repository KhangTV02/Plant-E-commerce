const backendDomin = "http://localhost:8080";

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post"
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post"
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get"
  },
  logout_user: {
    url: `${backendDomin}/api/user-Logout`,
    method: "get"
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get"
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post"
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post"
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get"
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post"
  },
  deleteProduct: {
    url: `${backendDomin}/api/delete-product`,
    method: "post"
  },

  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get"
  },
  //  getProductById: {
  //     url: `${backendDomin}/api/getProductById`, // Đường dẫn API
  //     method: 'get'
  // },
  //  categoryWiseProduct : {
  //     url : `${backendDomin}/api/category-product`,
  //     method : 'post'
  // },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post"
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post"
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get"
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-cart-product`,
    method: "get"
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post"
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post"
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get"
  },
  restoreProduct: {
    url: `${backendDomin}/api/restore-product`,
    method: "POST"
  },

  placeOrder: {
    url: `${backendDomin}/api/order`,
    method: "post"
  },
  allOrders: {
    url: `${backendDomin}/api/all-orders`,
    method: "get"
  },
  updateStatusOrder: {
    url: `${backendDomin}/api/update-status-order`,
    method: "put"
  },
  placeAllOrders: {
    url: `${backendDomin}/api/placeAllOrders`,
    method: "post"
  },
  getOrderStatistics: {
    url: `${backendDomin}/api/order-statistics`,
    method: "get"
  },
  getRevenueStatistics: {
    url: `${backendDomin}/api/revenue-statistics`,
    method: "get"
  },
  changePassword: {
    url: `${backendDomin}/api/change-password`,
    method: "put"
  },
  forgotPassword: {
    url: `${backendDomin}/api/forgot-password`,
    method: "post"
  },
  resetPassword: {
    url: `${backendDomin}/api/reset-password`,
    method: "post"
  },
  viewOrders: {
    url: `${backendDomin}/api/view-orders`,
    method: "get"
  },
  cancelOrder: {
    url: `${backendDomin}/api/cancel-order`,
    method: "post"
  },

  pendingOrders: {
    url: `${backendDomin}/api/pending-order`,
    method: "get"
  },
  pendingCountOrders: {
    url: `${backendDomin}/api/pending-count-order`,
    method: "get"
  },
  completeOrders: {
    url: `${backendDomin}/api/complete-orders`,
    method: "get"
  },
  updateStatusPayment: {
    url: `${backendDomin}/api/update-status-payment`,
    method: "put"
  },
};

export default SummaryApi;
