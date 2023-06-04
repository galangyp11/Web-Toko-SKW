import "./navbar.css";
import { useNavigate } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import { useSearch } from "../../context";
import searchItemCon from "../../context/SearchItemCon";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { dispatch } = useSearch();
  const [isSearch, setIsSearch] = useState(false)

  useEffect(()=>{

  },[])
  return (
    <div className="navbar-public d-flex align-items-center justify-content-center">
      <div className="row " style={{ width: "90dvw", height: "100%" }}>
        <div className="col" style={{ height: "100%" }}>
          {/* <img className='logo' src={logo} alt="logo bang" onClick={()=>navigate("/")}/> */}
          <p className="text-logo-skw d-flex align-items-center" onClick={() => navigate("/")}>SKW </p>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
          <div className="bg-search d-flex justify-content-center align-items-center border">
            <input
              className="search p-2 text-center"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                dispatch.setSearch(e.target.value);
              }}
            />
            <BsSearch color="#0E8388" size="20px" className="logo-search" />
          </div>
          {isSearch ? <searchItemCon/> : <></>}
        </div>
        <div
          className="col d-flex justify-content-end align-items-center"
          style={{ height: "100%" }}
        >
          <div className="row" style={{ height: "100%" }}>
            <div className="col d-flex justify-content-center align-items-center">
              <div
                className="but-daftar "
                id="button"
                onClick={() => navigate("/daftar-pembeli")}
              >
                <p className="text-daftar d-flex justify-content-center align-items-center">
                  Daftar
                </p>
              </div>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <div
                className="but-login "
                id="button"
                onClick={() => navigate("/login")}
              >
                <p className="text-login d-flex justify-content-center align-items-center">
                  Login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
