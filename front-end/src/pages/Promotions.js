import React from "react";

import Blackfriday from "../assets/blackfriday.jpg";

const Promotions = () => {
  return (
    <div className="container mx-auto text-center">
    
      <div className="w-full pt-16 justify-center text-center">
        <div>
          <p className="text-2xl font-bold text-green-600">
            🔥 Khuyến mãi hấp dẫn
          </p>
          <p className="mt-2 text-xl">
            🎁 Mua 5 tặng 1 - Áp dụng cho cây nội thất
          </p>
          <p className="mt-2 text-2xl">🚚 Miễn phí giao hàng cho đơn từ 500K</p>
          <p className="mt-2 text-2xl">
            🛍️ <strong>Black Friday</strong> - Giảm ngay 5.000đ cho tất cả sản
            phẩm
          </p>
          <img className="mx-auto w-[520px] h-full" src={Blackfriday} alt="" />
          <p className="mt-2 text-2xl">
            🏛️ <strong>Giỗ tổ Hùng Vương (10/3 ÂL)</strong> - Giảm ngay 10.000đ
          </p>
          <p className="mt-2 text-2xl">
            🇻🇳 <strong>30/4 - Ngày Giải phóng</strong> - Giảm ngay 10.000đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
