import Cookies from "js-cookie";
import fotoKosing from "../image/kuraplongo.jpg";
import "./navbarpembeli.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillCartFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { useSearch } from "../../context";
import Alert from "../AlertKuning";
import apiHost from "../../constants/apiHost";

const Navbar = () => {
  const [pembeliById, setPembeliById] = useState({});
  const navigate = useNavigate();
  const [foto, setFoto] = useState();
  const id = Cookies.get("id");
  const { dispatch } = useSearch();

  const [isAlert, setIsAlert] = useState(false)
  const [textAlert, setTextAlert] = useState('')

  useEffect(() => {
    const getItemById = async () => {
      const response = await axios.get(`${apiHost}pembeli/${id}`);
      setPembeliById(response.data);
      // console.log(response.data);
    };
    getItemById();
  }, []);

  useEffect(()=>{
    if(pembeliById.alamat === ""){
      setIsAlert(true)
      setTextAlert('Silahkan lengkapi profile')
    }

    if(pembeliById.foto_profil === 0 ){
      setFoto(fotoKosing)
    } else {
      setTimeout(() => {
        try {
          setFoto(
            btoa(
              String.fromCharCode(...new Uint8Array(pembeliById.foto_profil.data))
            )
          );
        } catch (error) {
          console.log("sabar bang fotonya lagi loading");
        }
      }, 100);
    
    }
  },[pembeliById])

  
  const handleLogout = () => {
    Cookies.remove("id");

    setTimeout(() => {
      navigate("/");
      window.location.reload(true);
    }, 100);
  };

  // console.log(pembeliById)

  return (
    <div className="navbar d-flex align-items-center justify-content-center">
      <div className="row " style={{ width: "90dvw", height: "100%" }}>
        <div
          className="col d-flex align-items-center"
          style={{ height: "100%" }}
        >
          <p className="text-logo-skw" onClick={() => navigate("/")}>
            SKW
          </p>
        </div>

        <div
          className="col-4 d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div className="bg-search d-flex justify-content-center align-items-center">
            <input
              className="search p-2"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                dispatch.setSearch(e.target.value);
              }}
            />
            <BsSearch color="#0E8388" size="20px" className="logo-search" />
          </div>
        </div>

        <div
          className="col-2 d-flex justify-content-end align-items-center"
          style={{ height: "100%" }}
        >
          <div
            className="bg-keranjang-pembeli mx-3 d-flex justify-content-center align-items-center"
            onClick={() => {
              navigate("/keranjang");
              // window.location.reload()
            }}
          >
            <BsFillCartFill color="#0E8388" size="25px" />
          </div>
        </div>

        <div
          className="col-2 d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div className="dropdown-center">
            <button
              className="dd-profile-pembeli row d-flex justify-content-center align-items-center p-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="col-1">
                <div className="bg-photo-profile d-flex justify-content-center align-items-center">
                  <img
                    className="photo-profile"
                    src={`data:image/png;base64,${foto}`}
                    alt="Photo-profile"
                  />
                </div>
              </div>
              <div className="col">{pembeliById.username}</div>
            </button>

            <ul className="dropdown-menu">
              <li
                className="dropdown-item dd-pembeli"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                {" "}
                Profile
              </li>
              <li
                className="dropdown-item dd-pembeli"
                onClick={() => {
                  navigate("/pesanan");
                }}
              >
                {" "}
                Pesanan Ku
              </li>
              <hr />
              <li
                className="dropdown-item dd-pembeli but-logout-navbar-pembeli"
                onClick={handleLogout}
              >
                {" "}
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
        <div className="d-flex justify-content-center">
          {isAlert ? <Alert textAlert={textAlert} isAlert={isAlert} setIsAlert={setIsAlert}/> : <div></div>}
        </div>
    </div>
  );
};

export default Navbar;
