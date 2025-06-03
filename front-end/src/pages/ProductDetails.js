import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context";

import SimilarProducts from "../components/SimilarProducts";

const ProductDetails = () => {
  const [data, setData] = useState({
    plantName: "",
    scientificName: "",
    category: [],
    plantImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    stock: ""
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity] = useState(1);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false); // State kiểm soát hiệu ứng chuyển đổi

  const fetchProductDetails = async (productId) => {
    setTransitioning(true); // Bắt đầu hiệu ứng fade out
    setTimeout(async () => {
      setLoading(true);
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ productId })
      });
      setLoading(false);
      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.plantImage[0]);
      setTransitioning(false); // Kết thúc hiệu ứng fade in
    }, 300); // Delay 300ms để tạo hiệu ứng
  };

  useEffect(() => {
    fetchProductDetails(params.id);
  }, [params.id]);

  const handleImageClick = () => {
    setShowLargeImage(true);
  };

  // Kiểm tra nếu data chưa có dữ liệu thì hiển thị "Đang tải..."
  if (!data || !data.plantName) {
    return (
      <div className="container">
        <h2 className="text-center text-lg font-bold mt-4">
          Đang tải sản phẩm...
        </h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        className={`flex flex-col lg:flex-row gap-4 pt-20 transition-opacity duration-300 pl-12 ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-72 lg:w-72 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
              onClick={handleImageClick}
              alt=""
            />
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((_, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={"loadingImage" + index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full ">
                {data?.plantImage?.map((imgURL) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                    key={imgURL}
                  >
                    <img
                      src={imgURL}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => setActiveImage(imgURL)}
                      onClick={() => setActiveImage(imgURL)}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="">
          <h2 className="text-2xl lg:text-4xl font-medium">
            {data?.plantName}
          </h2>
          <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
            {data?.scientificName}
          </p>
          <p className="capitalize text-slate-400">
            {data?.category?.join(", ")}
          </p>

          <div className="flex items-center gap-3 my-2">
            Tình trạng:
            {data?.stock > 0 ? (
              <p className="text-green-600 font-medium">Còn hàng</p>
            ) : (
              <p className="text-red-600 font-medium">Hết hàng</p>
            )}
          </div>

          <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
            {data?.sellingPrice && data?.sellingPrice !== 0 ? (
              <>
                <p className="text-red-600">
                  {displayINRCurrency(data?.sellingPrice * quantity)}
                </p>
                <p className="text-slate-400 line-through">
                  {displayINRCurrency(data?.price * quantity)}
                </p>
              </>
            ) : (
              <p className="text-red-600">
                {displayINRCurrency(data.price * quantity)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 my-2">
            {data?.stock > 0 && (
              <button
                className="border-2 border-green-600 rounded px-3 py-1 min-w-[120px] text-green-600 font-medium hover:bg-green-600 hover:text-white"
                onClick={async (e) => {
                  const result = await addToCart(e, data?._id); // Đợi thêm vào giỏ hàng

                  if (result?.success) {
                    await fetchUserAddToCart(); // Cập nhật giỏ hàng trong Context
                    navigate("/cart"); // Điều hướng sau khi giỏ hàng đã cập nhật
                  }
                }}
              >
                Mua
              </button>
            )}
          </div>

          <div>
            <p className="text-slate-600 font-medium my-1">Mô tả :</p>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>

      <SimilarProducts
        excludeProductId={data._id}
        onProductClick={(newProductId) => fetchProductDetails(newProductId)}
      />

      {showLargeImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center"
          onClick={() => setShowLargeImage(false)}
        >
          <img
            src={activeImage}
            className="max-w-full max-h-full object-contain"
            alt="Large Preview"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
