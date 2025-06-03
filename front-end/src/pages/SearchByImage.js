import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import displayINRCurrency from "../helpers/displayCurrency";
import scrollTop from "../helpers/scrollTop";
import SimilarProducts from "../components/SimilarProducts"; // ✅ Import sản phẩm tương tự

const SearchByImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictedPlant, setPredictedPlant] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(""); // ✅ Lưu ảnh mà người dùng tải lên
  const [searchCompleted, setSearchCompleted] = useState(false); // ✅ Kiểm soát việc tìm kiếm xong
   const [confidence] = useState(null); // ✅ Lưu độ chính xác của kết quả tìm kiếm
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
      if (!file) {
    return;
    }
    
     // ✅ Kiểm tra định dạng file
  const validExtensions = ["image/jpeg", "image/png"];
  if (!validExtensions.includes(file.type)) {
    toast.error("Chỉ chấp nhận tệp .jpg hoặc .png!");
    return;
  }
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file)); // ✅ Hiển thị ảnh mà người dùng chọn
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Vui lòng chọn một ảnh!");
      return;
    }

    setLoading(true);
    setSearchCompleted(false); // Reset trạng thái khi tìm kiếm mới
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5001/predict", formData);

      
      console.log("🔹 API Response:", response.data);

      setPredictedPlant(response.data.plant_name);
      setProducts(response.data.products || []);
      setSearchCompleted(true); // ✅ Đánh dấu tìm kiếm hoàn tất
    } catch (error) {
      toast.error("Lỗi tải ảnh:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Hàm xử lý khi click vào sản phẩm tương tự
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    scrollTop();
  };

  return (
    <div className="p-4 container mx-auto text-center mt-10">
      <h2 className="text-lg font-bold">Tìm kiếm cây cảnh bằng hình ảnh</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2" />

      <button onClick={handleUpload} className="bg-blue-600 text-white p-2 rounded ml-2">
        Tìm kiếm
      </button>

      {/* ✅ Luôn hiển thị ảnh mà người dùng đã tải lên */}
      {imagePreview && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Ảnh đã tải lên</h3>
          <img
            src={imagePreview}
            alt="Ảnh đã tải lên"
            className="mt-2 mx-auto rounded-lg shadow-lg"
            style={{ width: "300px" }}
          />
        </div>
      )}

      {loading && <p>Đang xử lý...</p>}

      {/* ✅ Hiển thị kết quả dự đoán chỉ khi có dữ liệu */}
      {searchCompleted && products.length > 0 &&  (
        <>
          <h3 className="text-xl font-bold pt-2">Dự đoán: {predictedPlant}</h3>
          {/* <p className="text-gray-500">🔍 Độ chính xác: {confidence}</p> */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Sản phẩm liên quan:</h4>
            <div className="flex gap-12 p-4 justify-center">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleProductClick(product._id)}
                >
                  <img
                    src={product.plantImage[0]}
                    alt={product.plantName}
                    className="w-52 h-40 object-cover rounded"
                  />
                  <p className="text-lg font-medium mt-2">{product.plantName}</p>
                  <p className="text-red-600 font-medium">
                    {displayINRCurrency(product.sellingPrice || product.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ✅ Nếu không có sản phẩm chính xác, hiển thị sản phẩm tương tự */}
      {searchCompleted && products.length === 0 && (
        <div className="mt-4">
          <p className="text-gray-500">
            Sản phẩm bạn tìm không có! Hãy chọn những sản phẩm khác bên dưới.
          </p>
          <SimilarProducts excludeProductId={null} onProductClick={handleProductClick} />
        </div>
      )}
    </div>
  );
};

export default SearchByImage;
