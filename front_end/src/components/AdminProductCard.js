import React, { useState } from "react";
import { toast } from "react-toastify";
import displayCurrency from "../helpers/displayCurrency";
import AdminEditProduct from "./AdminEditProduct";
import SummaryApi from "../common";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDeleteProduct = async (productId) => {
    if (!productId) {
      toast.error("ID sản phẩm không hợp lệ!");
      return;
    }

    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn ẩn sản phẩm này không?"
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId })
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message || "Ẩn sản phẩm thành công!");
        fetchdata();
      } else {
        toast.error(responseData.message || "Không thể ẩn sản phẩm!");
      }
    } catch (error) {
      console.error("Lỗi khi ẩn sản phẩm:", error);
      toast.error("Đã xảy ra lỗi khi ẩn sản phẩm!");
    }
  };

  const handleRestoreProduct = async (productId) => {
    try {
      const response = await fetch(SummaryApi.restoreProduct.url, {
        method: SummaryApi.restoreProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId })
      });
      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Khôi phục sản phẩm thành công!");
        fetchdata();
      } else {
        toast.error("Không thể khôi phục sản phẩm!");
      }
    } catch (error) {
      console.error("Lỗi khi khôi phục sản phẩm:", error);
      toast.error("Đã xảy ra lỗi khi khôi phục sản phẩm!");
    }
  };

  return (
    <div className="bg-white p-6 rounded text-center shadow-lg relative">
      {data?.isDeleted && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-sm px-2 py-1 rounded-br-xl">
          ĐÃ XÓA
        </div>
      )}

      <div className="w-56 h-44 flex justify-center items-center mx-auto">
        <img
          src={data?.plantImage[0]}
          alt={data?.plantName}
          className="object-fill h-full"
        />
      </div>

      <h1 className="text-lg font-medium line-clamp-2 mt-2">
        {data.plantName}
      </h1>

      <div className="mt-1">
        <p className="font-semibold text-gray-600">
          {displayCurrency(data.price)}
        </p>
        {data.sellingPrice > 0 && (
          <p className="font-semibold text-green-600">
            Khuyến mãi: {displayCurrency(data.sellingPrice)}
          </p>
        )}
      </div>

      <div className="flex justify-center  gap-3 mt-4">
        {!data?.isDeleted ? (
          <>
            <button
              className="w-fit p-2 bg-green-500 hover:bg-green-700 rounded-full hover: cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              Chỉnh sửa
            </button>
            <button
              className="w-fit p-2 bg-red-500 hover:bg-red-700 rounded-full hover: cursor-pointer"
              onClick={() => handleDeleteProduct(data._id)}
            >
              Xóa
            </button>
          </>
        ) : (
          <button
            className="w-fit p-2 bg-green-500 hover:bg-green-700 rounded-full hover:  cursor-pointer"
            onClick={() => handleRestoreProduct(data._id)}
          >
            Khôi phục
          </button>
        )}
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
