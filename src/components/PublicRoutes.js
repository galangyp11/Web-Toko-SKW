import "./routes.css";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import Navbar from "./publicuser/Navbar";
import NavbarPembeli from "./pembeli/NavbarPembeli";
import EmailCC from "./EmailCC";
import Footer from "./publicuser/Footer";

const PublicRoutes = () => {
  const [checkCookie, setCheckCookie] = useState();

  useEffect(() => {
    const getCookies = () => {
      setCheckCookie(Cookies.get("id"));
      console.log(Cookies.get("id"));
    };
    getCookies();
  }, []);

  return (
    <div className="routes">
      <div className="sticky-top">
        {checkCookie ? <NavbarPembeli /> : <Navbar />}
      </div>

      <div className="homepage-con container-md">
        <Outlet Context={checkCookie} />
      </div>
      
      <div className="sticky-bottom px-4 row" style={{display:"inline-block", width:'auto', zIndex:'5'}}>
        <EmailCC/>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default PublicRoutes;
