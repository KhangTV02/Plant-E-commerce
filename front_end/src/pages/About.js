import React from "react";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto text-center">
      <div>
        <Navbar />
      </div>
      <div className="pt-20 mx-auto max-w-5xl">
        <h2 className="text-2xl text-center font-bold text-green-600">
          🌿 Giới thiệu về Plant Shop
        </h2>
        <p>
          Cây cảnh, từ trước đến nay vẫn được xem như vật trang trí, làm đẹp
          không gian sống cho con người. Cây để bàn, bonsai, terrarium, cây thuỷ
          sinh hoặc cây treo chậu… mỗi loại mỗi cây đều có ý nghĩa và vẻ đẹp
          riêng của mình, góp phần đáng kể làm cho cuộc sống chúng ta thêm sinh
          động, trở nên đáng yêu và thanh bình hơn.
        </p>
        <p className="mt-4">
          Nhưng tại Plant Shop, chúng tôi muốn mang đến cho bạn không chỉ là cây
          cảnh, chúng tôi muốn mang đến cho bạn những trải nghiệm tuyệt vời mà
          không nơi nào có. Chúng tôi hiểu rằng khi chọn mua cây cảnh, bạn sẽ
          muốn:
        </p>
        <ul className="text-left mt-4 ml-6 list-disc">
          <li>
            Hiểu ý nghĩa (một cách sâu sắc, đúng đắn và vững chắc) về loại cây
            mà mình chọn.
          </li>
          <li>
            Hiểu phong thuỷ chính xác của cây để mang lại sự may mắn và thành
            công.
          </li>
          <li>Hiểu câu chuyện tạo nên ý nghĩa đằng sau từng loại cây.</li>
          <li>Hiểu cách chăm sóc để cây luôn trong trạng thái tốt nhất.</li>
          <li>Lựa chọn loại chậu và phụ kiện chăm sóc cây sao cho phù hợp.</li>
        </ul>
        <p className="mt-4">
          Và một điều có thể bạn chưa để ý… là thông qua loại cây bạn chọn, bạn
          sẽ thể hiện được cá tính và những gì độc đáo của bản thân mà không cần
          nói ra mà người khác đã tự hiểu rồi.
        </p>
        <p className="mt-4 font-semibold">
          Hãy một lần đến với Plant Shop, chúng tôi cam kết mang đến cho bạn các
          sản phẩm cây cảnh và dịch vụ chất lượng cao nhất với giá cả phải
          chăng.
        </p>
        <h3 className="text-xl text-left font-bold text-green-700 mt-6">
          🌱 Sứ mệnh
        </h3>
        <p className="text-left">
          Plant Shop đặt ra sứ mệnh cung cấp các loại cây làm đẹp không gian
          sống và đồng thời mang lại giá trị tinh thần, là điểm đến cho mọi
          khách hàng có nhu cầu tìm mua những cây cảnh trang trí đẹp, phù hợp cá
          tính, phong thuỷ, không gian sống và làm việc.
        </p>
        <h3 className="text-xl text-left font-bold text-green-700 mt-6">
          🌿 Tầm nhìn
        </h3>
        <p className="text-left">
          Đến năm 2023, Plant Shop phấn đấu trở thành 1 trong 3 đơn vị dẫn đầu
          trong lĩnh vực cung cấp cây cảnh để bàn, cây cảnh mini, bonsai, cây
          thuỷ sinh, terrarium.... tại Việt Nam, đồng thời trở thành nhà cung
          cấp đa dạng các loại hình cây cảnh với hệ thống phân phối rộng khắp cả
          nước.
        </p>
        <h3 className="text-xl text-left font-bold text-green-700 mt-6">
          🌱 Giá trị cốt lõi
        </h3>
        <ul className="text-left mt-4 ml-6 list-disc">
          <li>
            <strong>Chất lượng:</strong> Cam kết chỉ đưa ra thị trường các sản
            phẩm chất lượng.
          </li>
          <li>
            <strong>Chính trực:</strong> Luôn tư vấn khách hàng một cách công
            tâm, khách quan.
          </li>
          <li>
            <strong>Sáng tạo, đổi mới:</strong> Không ngừng quan sát, tìm hiểu
            và học hỏi để cải tiến sản phẩm.
          </li>
          <li>
            <strong>Đồng đội:</strong> Hợp tác tốt giữa các thành viên, chia sẻ
            và học hỏi lẫn nhau.
          </li>
        </ul>
      </div>
      <div className="mt-auto p-4 lex gap-2 justify-center">
        <Link
          to="/"
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-2xl"
        >
          Mua hàng ngay
        </Link>
      </div>
    </div>
  );
};

export default About;
