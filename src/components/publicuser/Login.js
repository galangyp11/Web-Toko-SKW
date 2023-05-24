import "./login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [inputUser, setInputUser] = useState({
    emailInput: "",
    passwordInput: "",
  });

  const [dataLoginAdmin, setDataLoginAdmin] = useState([]);
  const [dataLoginPembeli, setDataLoginPembeli] = useState([]);
  const [dataLoginPenjual, setDataLoginPenjual] = useState([]);

  const navigate = useNavigate();
  const [getUrl, setGetUrl] = useState("");

  useEffect(() => {
    const getAdminById = async () => {
      const response = await axios.get(`http://localhost:3311/admin`);
      setDataLoginAdmin(response.data);
      console.log(response.data);
    };
    getAdminById();

    const getPenjualById = async () => {
      const response = await axios.get(`http://localhost:3311/penjual`);
      setDataLoginPenjual(response.data);
      console.log(response.data);
    };
    getPenjualById();

    const getPembeliById = async () => {
      const response = await axios.get(`http://localhost:3311/pembeli`);
      setDataLoginPembeli(response.data);
      console.log(response.data);
    };
    getPembeliById();
  }, []);

  useEffect(() => {
    dataLoginPembeli.map((data) => {
      console.log("dataloginpembeli", data);
      if (
        data.email === inputUser.emailInput &&
        data.password === inputUser.passwordInput &&
        data.level === "Pembeli"
      ) {
        Cookies.set("id", `${data.id_pembeli}`);
        setGetUrl(`/`);
      } else {
        dataLoginPenjual.map((data) => {
          if (
            data.email === inputUser.emailInput &&
            data.password === inputUser.passwordInput &&
            data.level === "Penjual"
          ) {
            Cookies.set("id", `${data.id_penjual}`);
            setGetUrl(`/profile-toko`);
          } else {
            dataLoginAdmin.map((data) => {
              if (
                data.email === inputUser.emailInput &&
                data.password === inputUser.passwordInput &&
                data.level === "Admin"
              ) {
                Cookies.set("id", `${data.id_admin}`);
                setGetUrl(`/Admin`);
              } else {
                console.log("modar");
              }
            });
          }
        });
      }
    });
  }, [inputUser]);

  const handleInput = (e) => {
    e.preventDefault();
    setInputUser((data) => ({ ...data, [e.target.id]: e.target.value }));
  };

  const handleLogin = () => {
    navigate(getUrl);
    // console.log(getUrl)
  };

  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row ">
          <div className="col ">
            <p className="text-skw ">SKW</p>
            <br />
            <p className="text-tagline">
              Mempermudah Transaksi Jual Beli Secara Aman dan Nyaman
            </p>

            <Link to={"/"} style={{ textDecoration: "none" }}>
              <div className="but-back border mt-5">
                <p className="text-but-back d-flex justify-content-center align-items-center">
                  ← Kembali ke Beranda
                </p>
              </div>
            </Link>
          </div>

          <div className="col d-flex justify-content-end">
            <div className="test-form d-flex align-items-center">
              <div className="content-form pt-5 ">
                <div className="row mb-5 ">
                  <h3 className="text-center">Login</h3>
                </div>

                <div className="row mt-3 d-flex justify-content-center">
                  <input
                    className="input-text"
                    type="text"
                    placeholder="Email"
                    id="emailInput"
                    value={inputUser.emailInput}
                    onChange={handleInput}
                  />
                </div>

                <div className="row mt-3 d-flex justify-content-center">
                  <input
                    className="input-text"
                    type="password"
                    placeholder="Password"
                    id="passwordInput"
                    value={inputUser.passwordInput}
                    onChange={handleInput}
                  />
                </div>

                <div className="row  mt-3">
                  <div className="col d-flex justify-content-center">
                    <div className="but-login-login " onClick={handleLogin}>
                      <p className="text-login-login d-flex justify-content-center align-items-center">
                        Login
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row mt-5 px-4 d-flex justify-content-center">
                  <div className="row" style={{ height: "30px" }}>
                    <div className="col d-flex justify-content-start align-items-center">
                      <p className="text-daftar-login d-flex justify-content-start align-items-center">
                        Belum punya akun?
                      </p>
                    </div>
                    <div className="col p-0 d-flex justify-content-start align-items-center">
                      <Link
                        to={"/daftar-pembeli"}
                        style={{ textDecoration: "none" }}
                      >
                        <p className="but-daftar-login d-flex justify-content-start align-items-center">
                          Daftar
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="row" style={{ height: "30px" }}>
                    <div className="col d-flex justify-content-center align-items-center">
                      <p className="text-daftar-login d-flex justify-content-start align-items-center">
                        Ingin bergabung sebagai penjual?
                      </p>
                    </div>
                    <div className="col-2 p-0 d-flex justify-content-start align-items-center">
                      <Link
                        to={"/daftar-penjual"}
                        style={{ textDecoration: "none" }}
                      >
                        <p className="but-daftar-login d-flex justify-content-start align-items-center">
                          Gabung!
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
