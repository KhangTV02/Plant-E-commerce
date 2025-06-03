import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import displayCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import { useLocation } from "react-router-dom";

const ShowAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState([]);
  const productsToDisplay = searchQuery ? searchResults : allProducts;

  useEffect(() => {
  if (queryParam) {
    setSearchQuery(queryParam);
    handleSearchProduct(queryParam);
  } else {
    setSearchQuery("");
    fetchAllProducts(); 
    setSearchResults([]);
  }
  }, [queryParam]);
  
  const handleSearchProduct = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    const res = await fetch(`${SummaryApi.searchProduct.url}?q=${query}`);
    const data = await res.json();
    if (data.success) {
      setSearchResults(data.data);
    } else {
      setSearchResults([]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.allProduct.url); // API from getProduct.js
    const dataResponse = await response.json();
    setLoading(false);

    // 🛑 Lọc sản phẩm có stock > 0
    const filteredProducts = dataResponse.data.filter(
      (product) => product.stock > 0 && !product.isDeleted
    );
    setAllProducts(filteredProducts); // Store all products
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Extract unique categories from all products
  const uniqueCategories = [
    ...new Set(allProducts.flatMap((product) => product.category))
  ];

  return (
    <div className="container h-full mx-auto flex [calc(100vh-2rem)]">
      {/* Sidebar Category List */}
      <div className="w-1/5 h-full p-4 overflow-y-auto relative">
        <h2 className="text-lg text-white font-semibold mb-4 text-center bg-green-600 p-2">
          Lọc
        </h2>
        <ul>
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            uniqueCategories.map((category, index) => (
              <li key={index} className="">
                <label className="flex items-center space-x-2 pl-14">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox h-4 w-4 text-green-600 rounded"
                  />
                  <span>{category}</span>
                </label>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Product Display Section */}
      <div className="w-4/5 h-full p-4 overflow-y-auto border-l-4">
        <h2 className="text-lg text-white font-semibold mb-1 text-center bg-green-600 p-2">
          Tất cả sản phẩm
        </h2>

        <div className="grid grid-cols-5 gap-4">
          {productsToDisplay
            .filter(
              (product) =>
                selectedCategories.length === 0 ||
                selectedCategories.some((cat) => product.category.includes(cat))
            )
            .map((product, index) => (
              <Link
                to={`/product/${product._id}`}
                key={index}
                className="bg-slate-300 border p-4  shadow-xl justify-center"
              >
                <img
                  src={product.plantImage[0]}
                  alt={product.plantName}
                  className="w-48 h-40 mx-auto hover:scale-110 transition-transform"
                />

                <p className="text-center font-medium pt-1">
                  {product.plantName}
                </p>
                {/* <p className="text-center font-semibold">
                  Số lượng: {product.stock} cây
                </p> */}
                {product.sellingPrice > 0 ? (
                  <div className="text-center">
                    <p className="font-semibold line-through text-sm text-gray-500">
                      {displayCurrency(product.price)}
                    </p>
                    <p className="font-semibold text-green-600 text-sm">
                      Khuyến mãi: {displayCurrency(product.sellingPrice)}
                    </p>
                  </div>
                ) : (
                  <p className="text-center font-semibold">
                    {displayCurrency(product.price)}
                  </p>
                )}
                {/* <p className="text-center font-semibold text-sm">
                  Khuyến mãi: {displayCurrency(product.sellingPrice)}
                </p> */}
                <div className="mt-auto flex gap-2 justify-center">
                  <button
                    to="/cart"
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAllProducts;
