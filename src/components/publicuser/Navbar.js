import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import apiHost from "../../constants/apiHost";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState("");
  const [datum, setDatum] = useState([]);

  useEffect(() => {
    const onSearchItem = async (e) => {
      const response = await axios.get(`${apiHost}item?search=${dataSearch}`);
      setDatum(response.data);
    };
    onSearchItem();

    if (dataSearch !== "") {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }, [dataSearch]);

  const handleDataSearch = (e) => {
    e.preventDefault();
    setDataSearch(`${e.target.value}`);
  };

  const handleClickItem = (e) => {
    e.preventDefault();
    setIsSearch(false);
    window.location.reload();
  };

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  console.log({
    datum,
    dataSearch,
  });

  return (
    <div className="navbar-public d-flex align-items-center justify-content-center">
      <div
        className="row d-flex justify-content-center"
        style={{ width: "90dvw", height: "100%" }}
      >
        <div className="col" style={{ height: "100%" }}>
          {/* <img className='logo' src={logo} alt="logo bang" onClick={()=>navigate("/")}/> */}
          <p
            className="text-logo-skw d-flex align-items-center"
            onClick={() => navigate("/")}
          >
            SKW{" "}
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
              onChange={(e) => handleDataSearch(e)}
            />
            <BsSearch color="#0E8388" size="20px" className="logo-search" />
          </div>
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
        <div
          className="row d-flex justify-content-center"
          style={{ width: "50em" }}
        >
          {isSearch ? (
            <div className="bg-item-navbar px-4">
              {datum.length === 0 ? (
                <div className="item-tidak-ada d-flex justify-content-center">
                  <p className="text-item-tidak-ada d-flex align-items-center">
                    Item tidak ada
                  </p>
                </div>
              ) : (
                <div>
                  {datum?.slice(0, 5).map((data) => {
                    return (
                      <div
                        className="row d-flex justify-content-center my-2 "
                        key={data.id_item}
                        onClick={handleClickItem}
                      >
                        <Link
                          to={`/item/${data.id_item}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="row item-navbar d-flex align-items-center">
                            <div
                              className="col-2 p-0"
                              style={{ height: "90%" }}
                            >
                              <img
                                className="item-image"
                                style={{ objectFit: "contain" }}
                                src={
                                  data.gambar?.length
                                    ? `${apiHost}${data.gambar[0]}`
                                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className="col">
                              <p className="text-item-name">{data.nama_item}</p>
                              <p className="text-item-price">
                                {formatUang(data.harga_item).replace(
                                  /,00/g,
                                  ""
                                )}
                              </p>
                            </div>
                            <div className="col-4">
                              <p className="text-item-toko d-flex align-items-end pb-1">
                                {data.nama_toko}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
