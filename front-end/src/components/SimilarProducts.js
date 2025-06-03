import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import scrollTop from '../helpers/scrollTop';

const SimilarProducts = ({ excludeProductId, onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRandomProducts = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.allProduct.url, {
      method: SummaryApi.allProduct.method,
      headers: {
        "content-type": "application/json"
      }
    });
    const dataResponse = await response.json();
    setLoading(false);

    // Loại bỏ sản phẩm hiện tại và chọn ngẫu nhiên một vài sản phẩm
    const filteredProducts = dataResponse.data.filter(product => product._id !== excludeProductId);
    const randomProducts = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 5); // Lấy 4 sản phẩm ngẫu nhiên
    setProducts(randomProducts);
  };

  useEffect(() => {
    fetchRandomProducts();
  }, [excludeProductId]);

  const handleProductClick = (productId) => {
    onProductClick(productId); // Gọi hàm callback từ parent
    navigate(`/product/${productId}`); // Chuyển hướng đến trang sản phẩm mới
  };

  return (
    <div className='mb-5 mt-2'>
      <h2 className='text-2xl font-medium mb-4 pl-16'>Sản phẩm khác</h2>
      {loading ? (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array(5).fill(null).map((_, index) => (
            <div key={index} className='bg-slate-200 animate-pulse h-64 rounded'></div>
          ))}
        </div>
      ) : (
        <div className='flex gap-12 p-4 justify-center'>
          {products.map(product => (
            <div 
              key={product._id} 
              className='bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow'
              onClick={() => handleProductClick(product._id)}
            >
              <img src={product.plantImage[0]} alt={product.plantName} className='w-52 h-40 object-cover rounded'onClick={scrollTop} />
              <p className='text-lg font-medium mt-2'>{product.plantName}</p>
              <p className='text-red-600 font-medium'>{displayINRCurrency(product.sellingPrice || product.price)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;