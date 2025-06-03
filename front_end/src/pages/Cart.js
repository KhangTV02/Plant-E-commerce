import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";
import axios from "axios";
import qrPayment from "../assets/QR-payment.jpg";
const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userOrder, setUserOrder] = useState({ address: "", phone: "" });
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [showCheckout, setShowCheckout] = useState(null);
  const [useNewPhone, setUseNewPhone] = useState(false);
  const [showCheckoutAll, setShowCheckoutAll] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [checkoutData, setCheckoutData] = useState({
    address: "",
    phone: "",
    productId: ""
  });

  const context = useContext(Context);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: { "content-type": "application/json" }
    });

    const responseData = await response.json();
    if (responseData.success) {
      const filteredData = responseData.data.filter(
        (item) => item.productId?.stock > 0
      );
      setData(filteredData);
    }
  };

  const fetchUserOrder = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        // ✅ Dùng API user detail
        method: SummaryApi.current_user.method, // Giữ nguyên method từ API config
        credentials: "include", // Đảm bảo gửi cookie/session
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      if (data.success) {
        const user = data.data;
        setUserOrder(user);
        setCheckoutData({
          address: user.address || "", // ✅ Kiểm tra tránh lỗi undefined
          phone: user.phone || "",
          productId: ""
        });
      } else {
        toast.error(data.message || "Không thể tải thông tin!");
      }
    } catch (error) {
      console.error("🚨 Lỗi API:", error);
      toast.error("Không thể tải thông tin!");
    }
  };

  const handleCheckout = async (productId = null) => {
    if (!checkoutData.address || !checkoutData.phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const requestData = { ...checkoutData };
    if (productId) {
      requestData.productId = productId;
    }

    try {
      const response = await axios.post(
        SummaryApi.placeOrder.url,
        requestData,
        {
          withCredentials: true
        }
      );

      if (response.data.success) {
        toast.success("Đặt hàng thành công!");
        fetchData();
        context.fetchUserAddToCart();
        setShowCheckout(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi đặt hàng!");
    }
  };

  const handleCheckoutAll = async () => {
    if (!checkoutData.address || !checkoutData.phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // ✅ Lấy danh sách tất cả sản phẩm trong giỏ hàng
    const selectedProducts = data.map((item) => ({
      productId: item?.productId?._id,
      quantity: item?.quantity,
      price:
        (item?.productId?.sellingPrice || item.productId?.price) *
        item?.quantity
    }));

    // ✅ Chuẩn bị dữ liệu gửi đi
    const requestData = {
      address: checkoutData.address,
      phone: checkoutData.phone,
      products: selectedProducts // Danh sách tất cả sản phẩm cần thanh toán
    };

    console.log("📤 Dữ liệu gửi lên API:", requestData);

    try {
      const response = await axios.post(
        SummaryApi.placeAllOrders.url,
        requestData,
        {
          withCredentials: true
        }
      );

      console.log("📥 Phản hồi từ API:", response.data);

      if (response.data.success) {
        toast.success("Thanh toán tất cả sản phẩm thành công!");
        fetchData(); // Cập nhật lại giỏ hàng sau khi đặt hàng
        context.fetchUserAddToCart(); // ✅ Cập nhật số lượng giỏ hàng
        setShowCheckout(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Lỗi API Đặt hàng:",
        error.response ? error.response.data : error.message
      );
      toast.error("Lỗi khi đặt hàng!");
    }
  };

  const increaseQty = async (id, qty, stock) => {
    if (qty >= stock) {
      toast.error("Đã đạt giới hạn số lượng trong kho ! số lượng : " + stock);
      return;
    }

    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1
      })
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1
        })
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    if (!id) {
      toast.error("ID sản phẩm không hợp lệ!");
      return;
    }
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id
      })
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchUserOrder();
    setLoading(false);
  }, []);
  
  return (
    <div className="container mx-auto mt-12">
      <div className="text-2xl text-center font-bold mt-2">
        Giỏ hàng của bạn
      </div>
      <div className="font-bold italic text-sm text-center">
        Lưu ý: đơn hàng sẽ được giao đến nơi khoảng 3-5 ngày kể từ ngày đặt hàng
        !
      </div>
      <div className="text-center text-lg">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">Giỏ hàng trống</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-center py-4">
        {/* Danh sách sản phẩm */}
        <div className="w-full max-w-3xl relative">
          {data.map((product) => (
            <div
              key={product?._id}
              className="w-full bg-white p-4 mb-3 border rounded"
            >
              <div className="flex gap-4">
                <img
                  src={product?.productId?.plantImage[0]}
                  className="w-24 h-24"
                  alt={product?.productId?.plantName}
                />
                <div
                  className="absolute text-red-600 right-0   rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                  onClick={() => deleteCartProduct(product?._id)}
                >
                  Xóa
                </div>
                <div className="flex-1">
                  <h2 className="text-lg">{product?.productId?.plantName}</h2>
                  <p className="text-gray-600">
                    {displayINRCurrency(
                      (product?.productId?.sellingPrice ||
                        product?.productId?.price) * product?.quantity
                    )}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                      onClick={() =>
                        decraseQty(product?._id, product?.quantity)
                      }
                    >
                      -
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                      onClick={() =>
                        increaseQty(
                          product?._id,
                          product?.quantity,
                          product?.productId?.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                    onClick={() => {
                      setShowCheckout(product?._id);
                      setCheckoutData({
                        ...checkoutData,
                        productId: product?.productId?._id
                      });
                    }}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
              {/* Form nhập thông tin thanh toán */}
              {showCheckout === product?._id && (
                <div className="mt-4 border-t pt-3">
                  <h3 className="text-lg font-bold">Thông tin giao hàng</h3>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={useNewAddress}
                      onChange={() => setUseNewAddress(!useNewAddress)}
                    />
                    Nhập địa chỉ mới
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full my-2"
                    value={
                      useNewAddress
                        ? checkoutData.address
                        : userOrder.address || "Chưa có địa chỉ"
                    }
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        address: e.target.value
                      })
                    }
                    disabled={!useNewAddress}
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={useNewPhone}
                      onChange={() => setUseNewPhone(!useNewPhone)}
                    />
                    Nhập số điện thoại mới
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full my-2"
                    value={
                      useNewPhone
                        ? checkoutData.phone
                        : userOrder.phone || "Chưa có số điện thoại"
                    }
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        phone: e.target.value
                      })
                    }
                    disabled={!useNewPhone}
                  />
                  <select
                    className="border p-2 w-full my-2"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="COD">Thanh toán khi nhận hàng</option>
                    <option value="TRANSFER">Thanh toán trực tiếp</option>
                  </select>
                  {paymentMethod === "TRANSFER" && (
                    <div className="text-center my-3">
                      <p>Quét mã QR để thanh toán:</p>
                      <p className="text-red-600">
                        Hãy nhập đúng số tiền thanh toán
                      </p>
                      <img
                        src={qrPayment}
                        alt="QR Chuyển khoản"
                        className="w-40 mx-auto"
                      />
                    </div>
                  )}
                  <button
                    className="bg-green-600 text-white px-3 py-2 rounded"
                    onClick={() => handleCheckout(product?.productId?._id)}
                  >
                    Xác nhận thanh toán
                  </button>
                  <button
                    className="ml-2 text-red-600"
                    onClick={() => setShowCheckout(null)}
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Thanh toán tất cả */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm mr-3">
          {/* Form nhập dữ liệu */}
          {showCheckoutAll && (
            <div className="mb-4">
              <h3 className="text-lg font-bold">Thông tin giao hàng</h3>
              <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={useNewAddress}
                      onChange={() => setUseNewAddress(!useNewAddress)}
                    />
                    Nhập địa chỉ mới
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full my-2"
                    value={
                      useNewAddress
                        ? checkoutData.address
                        : userOrder.address || "Chưa có địa chỉ"
                    }
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        address: e.target.value
                      })
                    }
                    disabled={!useNewAddress}
                  />
             <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={useNewPhone}
                      onChange={() => setUseNewPhone(!useNewPhone)}
                    />
                    Nhập số điện thoại mới
                  </label>
                  <input
                    type="text"
                    className="border p-2 w-full my-2"
                    value={
                      useNewPhone
                        ? checkoutData.phone
                        : userOrder.phone || "Chưa có số điện thoại"
                    }
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        phone: e.target.value
                      })
                    }
                    disabled={!useNewPhone}
                  />
              <select
                className="border p-2 w-full my-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="COD">Thanh toán khi nhận hàng</option>
                <option value="TRANSFER">Thanh toán trực tiếp</option>
              </select>
              {paymentMethod === "TRANSFER" && (
                <div className="text-center my-3">
                  <p>Quét mã QR để thanh toán:</p>
                  <img
                    src={qrPayment}
                    alt="QR Chuyển khoản"
                    className="w-40 mx-auto"
                  />
                </div>
              )}
              <div className="mx-auto">
                <button
                  className="bg-green-600 text-white px-3 py-2 rounded"
                  onClick={handleCheckoutAll} // ✅ Truyền hàm callback
                >
                  Xác nhận thanh toán
                </button>
                <button
                  className="ml-2 text-red-600"
                  onClick={() => setShowCheckoutAll(false)} // ✅ Truyền hàm callback
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Tổng đơn hàng</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Số lượng</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Tổng tiền</p>
                <p>
                  {displayINRCurrency(
                    data.reduce(
                      (sum, item) =>
                        sum +
                        (item?.productId?.sellingPrice ||
                          item?.productId?.price) *
                          item?.quantity,
                      0
                    )
                  )}
                </p>
              </div>
              <button
                className="bg-blue-600 p-2 text-white w-full mt-2"
                onClick={() => setShowCheckoutAll(true)} // ✅ Truyền hàm callback
              >
                Thanh toán tất cả
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
