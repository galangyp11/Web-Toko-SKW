import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import Navbar from "./publicuser/Navbar";
import NavbarPembeli from "./pembeli/NavbarPembeli";
import Footer from "./publicuser/Footer";

const PublicRoutes = () => {

    const [checkCookie, setCheckCookie] = useState();

    useEffect(() => {
        const getCookies = () => {
            setCheckCookie(Cookies.get('id'))
            console.log(Cookies.get('id'))
        }
        getCookies()
    })

    return ( 
       <div className="public-routes">
             <div className="sticky-top">
                {checkCookie ? <NavbarPembeli/> : <Navbar/>}
            </div>
            
            <div className="homepage-con container">
                <Outlet Context={checkCookie}/>
            </div>

            <div className="">   
                <Footer/>       
            </div>
       </div>
     );
}
 
export default PublicRoutes;