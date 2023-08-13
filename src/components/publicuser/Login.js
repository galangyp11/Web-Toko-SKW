import "./login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Cookies from "js-cookie";
import apiHost from "../../constants/apiHost";
import Alert from "../Alert/AlertMerah";

const Login = () => {
  const [inputUser, setInputUser] = useState({
    emailInput: "",
    passwordInput: "",
  });

  const [dataLoginAdmin, setDataLoginAdmin] = useState([]);
  const [dataLoginPembeli, setDataLoginPembeli] = useState([]);
  const [dataLoginPenjual, setDataLoginPenjual] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const navigate = useNavigate();
  const [typePassword, setTypePassword] = useState("password");
  const [isHiddenPass, setIsHiddenPass] = useState(false);

  useEffect(() => {
    const getAdminById = async () => {
      const response = await axios.get(`${apiHost}admin`);
      setDataLoginAdmin(response.data);
    };
    getAdminById();

    const getPenjualById = async () => {
      const response = await axios.get(`${apiHost}penjual`);
      setDataLoginPenjual(response.data);
    };
    getPenjualById();

    const getPembeliById = async () => {
      const response = await axios.get(`${apiHost}pembeli`);
      setDataLoginPembeli(response.data);
    };
    getPembeliById();
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    setInputUser((data) => ({ ...data, [e.target.id]: e.target.value }));
  };

  const handleLogin = () => {
    dataLoginPembeli.map((data) => {
      if (
        (data.email === inputUser.emailInput ||
          data.username === inputUser.emailInput) &&
        data.password === inputUser.passwordInput &&
        data.level === "Pembeli"
      ) {
        Cookies.set("id", `${data.id_pembeli}`);
        navigate(`/`);
      } else {
        dataLoginPenjual.map((data) => {
          if (
            (data.email_penjual === inputUser.emailInput ||
              data.nama_toko === inputUser.emailInput) &&
            data.password === inputUser.passwordInput &&
            data.level === "Penjual"
          ) {
            Cookies.set("id", `${data.id_penjual}`);
            navigate(`/penjual`);
          } else {
            dataLoginAdmin.map((data) => {
              if (
                (data.email === inputUser.emailInput ||
                  data.username === inputUser.emailInput) &&
                data.password === inputUser.passwordInput &&
                data.level === "Admin"
              ) {
                Cookies.set("id", `${data.id_admin}`);
                navigate(`/Admin`);
              } else {
                setIsAlert(true);
                setTextAlert("Email atau Password Salah");
              }
            });
          }
        });
      }
    });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  const handleHiddenPass = (e) => {
    e.preventDefault();
    setIsHiddenPass(false);
    setTypePassword("password");
  };

  const handleShowPass = (e) => {
    e.preventDefault();
    setIsHiddenPass(true);
    setTypePassword("text");
  };

  console.log({ dataLoginPenjual });

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
                <form>
                  <div className="row mb-5 ">
                    <h3 className="text-center">Login</h3>
                  </div>

                  <div className="row mt-3 d-flex justify-content-center">
                    <input
                      className="input-text"
                      type="text"
                      placeholder="Email / Username"
                      id="emailInput"
                      value={inputUser.emailInput}
                      onKeyDown={handleKeypress}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="row mt-3 d-flex justify-content-center">
                    <input
                      className="input-text mx-2"
                      type={typePassword}
                      placeholder="Password"
                      id="passwordInput"
                      value={inputUser.passwordInput}
                      onKeyDown={handleKeypress}
                      onChange={handleInput}
                    />
                    <div className="lihat-password">
                      {isHiddenPass ? (
                        <BsEyeFill
                          size="1.2em"
                          color="#0E8388"
                          onClick={handleHiddenPass}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <BsEyeSlashFill
                          size="1.2em"
                          color="#0E8388"
                          onClick={handleShowPass}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="row  mt-3">
                    <div className="col d-flex justify-content-center">
                      <button
                        className="but-login-login"
                        onClick={handleLogin}
                        // type="submit"
                      >
                        Login
                      </button>
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {isAlert ? (
            <Alert
              textAlert={textAlert}
              isAlert={isAlert}
              setIsAlert={setIsAlert}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
