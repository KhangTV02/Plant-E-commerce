import React from "react";
import Navbar from "../components/NavBar";
import hdmh from "../assets/hdmh.png";
import cscc from "../assets/chamsoccay.jpg";
import B2 from "../assets/B2.png"
const Support = () => {
  return (
    <div className="container mx-auto text-center">
      <div>
        <Navbar />
      </div>
      <div className="pt-20">
        <h2 className="text-2xl font-bold text-green-600 mb-10">
          📖 Hỗ trợ khách hàng
        </h2>
      </div>

      <div className="p-5 justify-items-center bg-green-100 rounded-lg">
        <h3 className="text-2xl font-semibold text-green-700">
          🌱 Cách chăm sóc cây cảnh
        </h3>
        <ul className="text-center text-xl mt-2 font-bold">
          <li>Đảm bảo cây nhận đủ ánh sáng nhưng tránh ánh nắng gắt.</li>
          <li>Tưới nước vừa đủ, tránh làm úng rễ cây.</li>
          <li>Thay chậu và bón phân định kỳ để cây phát triển tốt.</li>
          <li>Kiểm tra sâu bệnh và xử lý kịp thời.</li>
        </ul>
        <img className="w-[720px] h-full" src={cscc} alt="" />
      </div>

      <div className="mx-auto justify-items-center p-5 bg-blue-100 rounded-lg">
        <h3 className="text-2xl font-semibold text-blue-700">
          🛒 Hướng dẫn mua hàng
        </h3>
        <div className="text-center justify-center mt-2 font-bold text-xl">
          <p>Bước 1: Chọn sản phẩm và thêm vào giỏ hàng</p>
          <div className="">
            <img className="w-full h-full"src={hdmh} alt="" />
          </div>
          <p>Bước 2: Kiểm tra giỏ hàng và tiến hành thanh toán.</p>
          <p>
            Đầu tiên, hãy bấm thanh toán
          </p>
           <p>Nhập thông tin giao hàng chính xác.</p>
          <p>Chọn phương thức thanh toán phù hợp.</p>
          <p>Hoàn tất đơn hàng !!!</p>
          <img className="w-full h-full" src={B2} alt=""/>
         
        </div>
      </div>
    </div>
  );
};

export default Support;
