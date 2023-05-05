import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {

    const [checkCookie, setCheckCookie] = useState();

    useEffect(() => {
        const getCookies = () => {
            setCheckCookie(Cookies.get('id'))
            console.log(Cookies.get('id'))
        }
        getCookies()
    })

    return ( 
        checkCookie ? <Outlet Context={checkCookie}/> : <Navigate to="/login"/>
     );
}
 
export default ProtectedRoutes;