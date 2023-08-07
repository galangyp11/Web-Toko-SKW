import axios from "axios";
import apiHost from "../../constants/apiHost";
import "./daftarpembeli.css";
import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import fotoKosong from "../image/pp-kosong.png";

import Alert from "../Alert/AlertMerah";
import AlertHijau from "../Alert/AlertHijau";

const DaftarPembeli = () => {
  const navigate = useNavigate();
  const [dataInput, setDataInput] = useState({
    email: "",
    username: "",
    password: "",
    alamat: "",
    foto_profil: [],
    no_rek_pembeli: null,
    level: "Pembeli",
  });
  const [isAlert, setIsAlert] = useState(false);
  const [isAlertHijau, setIsAlertHijau] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [dataPembeliEmail, setDataPembeliEmail] = useState({});
  const [dataPembeliUsername, setDataPembeliUsername] = useState({});
  const [typePassword, setTypePassword] = useState("password");
  const [isHiddenPass, setIsHiddenPass] = useState(false);

  const handleInput = (e) => {
    setDataInput((data) => ({
      ...data,
      [e.target.id]: e.target.value,
      foto_profil: fotoKosong,
    }));
  };

  const handleDaftarPembeli = async (e) => {
    e.preventDefault();

    const responseEmail = await axios.get(
      `${apiHost}pembeli-email?search=${dataInput.email}`
    );
    setDataPembeliEmail(responseEmail.data);

    const responseUsername = await axios.get(
      `${apiHost}pembeli-username?search=${dataInput.username}`
    );
    setDataPembeliUsername(responseUsername.data);

    if (dataInput.email === "") {
      setIsAlert(true);
      setTextAlert("Email tidak boleh kosong!");
    } else if (dataInput.email === dataPembeliEmail[0]?.email) {
      setIsAlert(true);
      setTextAlert("Email sudah terdaftar!");
    } else if (dataInput.password === "") {
      setIsAlert(true);
      setTextAlert("Password tidak boleh kosong!");
    } else if (dataInput.password.length < 8) {
      setIsAlert(true);
      setTextAlert("Password harus lebih dari 8 karakter");
    } else if (dataInput.username === "") {
      setIsAlert(true);
      setTextAlert("Username tidak boleh kosong!");
    } else if (dataInput.username === dataPembeliUsername[0]?.username) {
      setIsAlert(true);
      setTextAlert("Username sudah terdaftar!");
    } else {
      try {
        await axios.post(`${apiHost}pembeli`, dataInput);
        setIsAlertHijau(true);
        setTextAlert("Akun berhasil dibuat");
        setTimeout(() => {
          navigate("/login");
        }, 1500);

        console.log("bisa kog");
      } catch (error) {
        console.log("eror bang gabisa input");
      }
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
  console.log({ dataInput, dataPembeliEmail, dataPembeliUsername });
  return (
    <div className="daftar-pembeli">
      <div className="daftar-pembeli-con container d-flex justify-content-center align-items-center">
        <div className="form-daftar-pembeli d-grid row d-flex justify-content-center">
          <div className="form-head-pembeli my-0 d-flex justify-content-center row ">
            <h2 className="text-registrasi-pembeli d-flex justify-content-center align-items-center">
              Registrasi
            </h2>
          </div>

          <div className="form-body-pembeli mb-2 d-flex justify-content-center row">
            <div className="row d-flex justify-content-center">
              <label htmlFor="email" id="label-input">
                Email
              </label>
              <input
                className="input-text"
                type="text"
                required
                placeholder="Masukan email anda..."
                id="email"
                value={dataInput.email}
                onChange={handleInput}
              />
            </div>

            <div className="row d-flex justify-content-center">
              <label htmlFor="password" id="label-input">
                Password
              </label>
              <input
                className="input-text mx-2"
                type={typePassword}
                required
                placeholder="Masukan password anda..."
                id="password"
                value={dataInput.password}
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

            <div className="row d-flex justify-content-center">
              <label htmlFor="username" id="label-input">
                Username
              </label>
              <input
                className="input-text"
                type="text"
                required
                placeholder="Masukan username anda..."
                id="username"
                value={dataInput.username}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-footer-pembeli my-2 row d-flex justify-content-center align-items-end">
            <div className="col d-flex justify-content-start">
              <div
                className="but-beranda-daftar-pembeli"
                onClick={() => navigate("/")}
              >
                <p className="text-but-beranda-daftar-pembeli d-flex justify-content-center align-items-center">
                  Beranda
                </p>
              </div>
            </div>
            <div className="col d-flex justify-content-end">
              <div
                className="but-next-daftar-pembeli"
                onClick={handleDaftarPembeli}
              >
                <p className="text-but-next-daftar-pembeli d-flex justify-content-center align-items-center">
                  Daftar
                </p>
              </div>
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
        {isAlertHijau ? (
          <AlertHijau
            textAlert={textAlert}
            isAlert={isAlertHijau}
            setIsAlert={setIsAlertHijau}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default DaftarPembeli;
