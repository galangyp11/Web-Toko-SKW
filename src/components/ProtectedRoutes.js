import "./routes.css";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Homepage from "./publicuser/Homepage";
import PublicRoutes from "./PublicRoutes";
import PageNotFound from "./PageNotFound";

const ProtectedRoutes = () => {
  const [checkCookie, setCheckCookie] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getCookies = () => {
      setCheckCookie(Cookies.get("id"));
      console.log(Cookies.get("id"));
    };
    getCookies();
  }, []);

  return (
    <div className="protected-routes">
      {checkCookie ? <Outlet /> : <PageNotFound />}
    </div>
  );
};

export default ProtectedRoutes;
