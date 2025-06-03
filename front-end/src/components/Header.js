import React, { useContext, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import { toast } from "react-toastify";
import Context from "../context";
import ROLE from "../common/role";
import "../App.css";
const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const context = useContext(Context);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include"
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-20 shadow-md bg-white fixed w-full z-50 top-0">
      <div className="h-full container mx-auto flex items-center px-8  justify-between max-[376px]:gap-3 max-[376px]:px-3 max-[1024px]:px-4 max-[1024px]:gap-3">
        <div>
          <Link to="/" className="text-2xl font-bold text-green-600">
            🌱 Plant Shop
          </Link>
        </div>
        <div className="hidden lg:flex md:flex max-[769px]:w-56 items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            className="w-full outline-none pl-2 "
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[80px] max-[769px]:min-w-[40px] gap-4 h-8 bg-green-600 flex items-center justify-center rounded-r-full text-white ">
            {/* <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" />
              <FiImage />
            </label> */}
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7 max-[376px]:gap-4">
          <div
            className="relative group flex justify-center"
            onMouseEnter={() => setMenuDisplay(true)}
            onMouseLeave={() => setMenuDisplay(false)}
          >
            {user?._id && (
              <div
                className="text-3xl cursor-pointer"
                // onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user ? (
                  user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  ) : (
                    <span className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  )
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0  top-full h-fit p-2 shadow-lg rounded z-100 border-2 border-gray-800">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-green-200 p-2 text-center border-b-2"
                      onClick={() => setMenuDisplay((preve) => !preve)} 
                    >
                      Bảng điều khiển
                    </Link>
                  )}
                </nav>
                <nav className="flex flex-col">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMenuDisplay(false);
                    }}
                    className="whitespace-nowrap hidden md:block hover:bg-green-200 p-2 border-b-2"
                  >
                    Trang cá nhân
                  </button>
                  <button
                    onClick={() => {
                      navigate("/change-password");
                      setMenuDisplay(false);
                    }}
                    className="whitespace-nowrap hidden md:block hover:bg-green-200 p-2 border-b-2"
                  >
                    Đổi mật khẩu
                  </button>
                  <button
                    onClick={() => {
                      navigate("/view-orders");
                      setMenuDisplay(false);
                    }}
                    className="whitespace-nowrap hidden md:block hover:bg-green-200 p-2 border-b-2"
                  >
                    Thông tin đơn hàng
                  </button>
                  <button
                    onClick={() => {
                      navigate("/complete-orders");
                      setMenuDisplay(false);
                    }}
                    className="whitespace-nowrap hidden md:block hover:bg-green-200 p-2 border-b-2"
                  >
                    Lịch sử mua hàng
                  </button>
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-green-600 h-5 rounded-full text-white w-5 p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}
          <div className="flex gap-3">
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-green-600 hover:bg-green-700"
              >
                Đăng xuất
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="px-3 py-1 rounded-full text-white bg-green-600 hover:bg-green-700"
                >
                  Đăng nhập
                </Link>
                <Link
                  to={"/sign-up"}
                  className="px-3 py-1 rounded-full text-white bg-green-600 hover:bg-green-700"
                >
                  Tạo tài khoản
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
