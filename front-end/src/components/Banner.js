import React, { useEffect, useState } from "react";
// import image1 from '../assets/img-banner-1.jpg'
import image2 from "../assets/img-banner-2.jpg";
import image3 from "../assets/img-banner-3.jpg";
import image1 from "../assets/img-banner-1.png";
import image4 from "../assets/img-banner-4.png";
import { Link } from "react-router-dom";

// import image1Mobile from '../assest/banner/img1_mobile.jpg'
// import image2Mobile from '../assest/banner/img2_mobile.webp'
// import image3Mobile from '../assest/banner/img3_mobile.jpg'

// import { FaAngleRight } from "react-icons/fa6";
// import { FaAngleLeft } from "react-icons/fa6";

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4];

  // const mobileImages = [
  //     image1Mobile,
  //     image2Mobile,
  //     image3Mobile,
  // ]

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const preveImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded pt-14">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden ">
          <div className=" flex justify-between w-full text-2xl">
          </div>
        </div>

        {/**desktop and tablet version */}
        <div className="hidden md:flex h-full overflow-hidden">
          {desktopImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full" alt="" />
              </div>
            );
          })}
        </div>

        {/**mobile version */}
        {/* <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                        mobileImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full object-cover'/>
                            </div>
                            )
                        })
                }
              </div> */}
      </div>
    </div>
  );
};

export default Banner;
