import React from "react";
import logoImage from "../assets/logo.png";
const Logo = (w,h) => {
  return (
    <div>
      <img src={logoImage} alt="Logo" style={{ width: "w", height: "h" }} />
    </div>
  );
};

export default Logo;
