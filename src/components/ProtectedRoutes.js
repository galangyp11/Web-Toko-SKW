import './routes.css';
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Homepage from './publicuser/Homepage';
import PublicRoutes from './PublicRoutes';

const ProtectedRoutes = () => {

    const [checkCookie, setCheckCookie] = useState();

    useEffect(() => {
        const getCookies = () => {
            setCheckCookie(Cookies.get('id'))
            console.log(Cookies.get('id'))
        }
        getCookies()
    },[])

    return (
        <div className="protected-routes">
            {checkCookie ? <Outlet/> : <Homepage/>}
        </div>
     );
}
 
export default ProtectedRoutes;