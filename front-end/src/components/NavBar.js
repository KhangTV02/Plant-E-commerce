import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600 shadow-md py-3 px-6 flex justify-around items-center fixed z-10 w-full">
      {/* Menu */}
      <div className="flex gap-6">
        <Link
          to="/about"
          className="text-white hover:text-green-500 transition"
        >
          Giới thiệu
        </Link>

   
          <Link
          to="/support"
          className="text-white hover:text-green-500 transition"
        >
          Hỗ trợ
        </Link>

        <Link
          to="/contact"
          className="text-white hover:text-green-500 transition"
        >
          Liên hệ
        </Link>
        <Link
          to="/promotions"
          className="text-white hover:text-green-500 transition"
        >
          Khuyến mãi
        </Link>
      </div>
      <button>
        <Link
          to="/search-image"
          className="h-full font-bold p-2 rounded-full text-green-600 bg-white transition"
        >
          Tìm kiếm bằng hình ảnh
        </Link>
      </button>
      {/* Thanh tìm kiếm */}
      {/* <div className="hidden lg:flex md:flex max-[768px]:max-w-xs items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm..."
          className="w-full outline-none pl-2 "
        />
        <div className="text-lg min-w-[80px] gap-4 h-8 bg-green-600 flex items-center justify-center rounded-r-full text-white ">
          <GrSearch className="cursor-pointer" />
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
