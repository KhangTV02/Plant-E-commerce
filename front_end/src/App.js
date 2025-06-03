import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import SummaryApi from "./common";
import { useEffect, useState } from "react";
import Context from "./context";
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Navbar from "./components/NavBar";
function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"
    })

    const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }

    const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()
     console.log("dataApi",dataApi)
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    // user-details
    fetchUserDetails()
    // user-add-to-cart
    fetchUserAddToCart()
  })

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, // uder details fetch
        cartProductCount, // cart product count
        fetchUserAddToCart // user add to cart
      }}>
        <ToastContainer
          position="top-center"
          autoClose={1000}
        t/>

        <Header />
        <main className="min-h-[calc(100vh-100px)] pt-20">
          <Navbar/>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
