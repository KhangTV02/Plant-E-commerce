import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    plantName: productData?.plantName,
    scientificName: productData?.scientificName,
    category: productData?.category,
    plantImage: productData?.plantImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
    stock: productData?.stock
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setData((preve) => {
        const newCategories = checked
          ? [...preve.category, value]
          : preve.category.filter((cat) => cat !== value);
        return {
          ...preve,
          category: newCategories
        };
      });
    } else {
      setData((preve) => {
        return {
          ...preve,
          [name]: value
        };
      });
    }
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        plantImage: [...preve.plantImage, uploadImageCloudinary.url]
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newProductImage = [...data.plantImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        plantImage: [...newProductImage]
      };
    });
  };

    /**upload product */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="mt-16 fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Chỉnh sửa thông tin sản phẩm</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="plantName">Tên cây :</label>
          <input
            type="text"
            id="plantName"
            placeholder="Nhập tên cây"
            name="plantName"
            value={data.plantName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="scientificName" className="mt-3">
            Tên khoa học :
          </label>
          <input
            type="text"
            id="scientificName"
            placeholder="Nhập tên khoa học của cây"
            value={data.scientificName}
            name="scientificName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category" className="mt-3">
            Loại :
          </label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {productCategory.map((el, index) => (
              <label
                key={el.value + index}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  name="category"
                  value={el.value}
                  checked={data.category.includes(el.value)}
                  onChange={handleOnChange}
                  className="form-checkbox h-4 w-4 text-green-600 rounded"
                />
                <span>{el.label}</span>
              </label>
            ))}
          </div>

          <label htmlFor="plantImage" className="mt-3">
            Hình ảnh cây :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Tải ảnh cây</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.plantImage[0] ? (
              <div className="flex items-center gap-2">
                {data.plantImage.map((el, index) => {
                  return (
                    <div key={el} className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-green-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">*Hãy cập nhật ảnh của cây</p>
            )}
          </div>
          <label htmlFor="stock">Số lượng trong kho :</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={data.stock}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="price" className="mt-3">
            Giá :
          </label>
          <input
            type="number"
            id="price"
            placeholder="Nhập giá"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Giá khuyến mãi :
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Nhập giá khuyến mãi"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            Mô tả :
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Nhập mô tả"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-green-600 text-white mb-10 hover:bg-green-700">
            Cập nhật
          </button>
        </form>
      </div>

      {/***display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
