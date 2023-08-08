import axios from "axios";
import "./daftarpenjual.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMerah from "../../Alert/AlertMerah";
import AlertHijau from "../../Alert/AlertHijau";
import apiHost from "../../../constants/apiHost";

const Daftarpenjual1 = () => {
  const navigate = useNavigate();
  const [dataInput, setDataInput] = useState({
    level: "Penjual",
    email_penjual: "",
    nama_toko: "",
    logo_toko: [],
    password: "",
    alamat: "",
    whatsapp: "",
    no_rek_penjual: "",
  });
  const [dataPenjualEmail, setDataPenjualEmail] = useState([]);
  const [dataPenjualNamaToko, setDataPenjualNamaToko] = useState([]);
  const [dataPenjualNoRek, setDataPenjualNoRek] = useState([]);
  const [dataPenjualNoWa, setDataPenjualNoWa] = useState([]);
  const [typePassword, setTypePassword] = useState("password");
  const [isHiddenPass, setIsHiddenPass] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);
  const [isAlertMerah, setIsAlertMerah] = useState(false);
  const [isAlertHijau, setIsAlertHijau] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const handleInput = (e) => {
    setDataInput((data) => ({ ...data, [e.target.id]: e.target.value }));
  };

  const handleDaftarPenjual = async (e) => {
    e.preventDefault();

    const responseEmail = await axios.get(
      `${apiHost}penjual-email?search=${dataInput.email_penjual}`
    );
    setDataPenjualEmail(responseEmail.data);

    const responseNamaToko = await axios.get(
      `${apiHost}penjual-toko?search=${dataInput.nama_toko}`
    );
    setDataPenjualNamaToko(responseNamaToko.data);

    const responseNoWa = await axios.get(
      `${apiHost}penjual-no-wa?search=${dataInput.whatsapp}`
    );
    setDataPenjualNoWa(responseNoWa.data);

    const responseNoRek = await axios.get(
      `${apiHost}penjual-no-rek?search=${dataInput.no_rek_penjual}`
    );
    setDataPenjualNoRek(responseNoRek.data);

    if (dataInput.email_penjual === "") {
      setIsAlertMerah(true);
      setTextAlert("Email tidak boleh kosong!");
    } else if (dataInput.password === "") {
      setIsAlertMerah(true);
      setTextAlert("Password tidak boleh kosong!");
    } else if (dataInput.password.length < 8) {
      setIsAlertMerah(true);
      setTextAlert("Password harus lebih dari 8 karakter");
    } else if (dataInput.nama_toko === "") {
      setIsAlertMerah(true);
      setTextAlert("Nama Toko tidak boleh kosong!");
    } else if (dataInput.logo_toko.length === 0) {
      setIsAlertMerah(true);
      setTextAlert("Logo Toko tidak boleh kosong!");
    } else if (dataInput.alamat === "") {
      setIsAlertMerah(true);
      setTextAlert("Alamat tidak boleh kosong!");
    } else if (dataInput.no_rek_penjual === "") {
      setIsAlertMerah(true);
      setTextAlert("No Rekening tidak boleh kosong!");
    } else if (dataInput.whatsapp === "") {
      setIsAlertMerah(true);
      setTextAlert("Whatsapp tidak boleh kosong!");
    } else if (dataInput.email_penjual === dataPenjualEmail[0]?.email_penjual) {
      setIsAlertMerah(true);
      setTextAlert("Email sudah terdaftar!");
    } else if (dataInput.nama_toko === dataPenjualNamaToko[0]?.nama_toko) {
      setIsAlertMerah(true);
      setTextAlert("Nama Toko sudah terdaftar!");
    } else if (
      dataInput.no_rek_penjual === dataPenjualNoRek[0]?.no_rek_penjual
    ) {
      setIsAlertMerah(true);
      setTextAlert("Nomor Rekening sudah terdaftar!");
    } else if (dataInput.whatsapp === dataPenjualNoWa[0]?.whatsapp) {
      setIsAlertMerah(true);
      setTextAlert("Nomor Whatsapp sudah terdaftar!");
    } else {
      await axios.post(`${apiHost}penjual`, dataInput);
      setIsAlertHijau(true);
      setTextAlert("Akun berhasil didaftarkan!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const onChangeFile = async (evt) => {
    console.log("evt", evt.target.files);
    if (evt.target.files.length > 1) {
      alert("maksimum upload 1 file");
      document.getElementById("imageFile").value = "";
      setDataInput((data) => ({ ...data, logo_toko: [] }));
      return false;
    }

    if (evt.target.files.length > 0) {
      const logo_toko = [];

      Array.from(evt.target.files).forEach((imageFile) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const srcData = fileReader.result;
          logo_toko.push(srcData);
        };
        fileReader.readAsDataURL(imageFile);
      });

      setDataInput((data) => ({ ...data, logo_toko }));
    }

    const images = [];
    Array.from(evt.target.files)?.forEach(async (d) => {
      images.push(URL.createObjectURL(d));
    });
    console.log("imgs", images);
    setPreviewImg(images);
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

  console.log({
    dataInput,
    dataPenjualEmail,
    // noHalaman
  });

  return (
    <div className="daftar-penjual">
      <div className="daftar-penjual-con container d-flex justify-content-center align-items-center">
        <div className="form-daftar-penjual d-grid row d-flex justify-content-center align-items-start">
          <div className="form-head-penjual my-3 d-flex justify-content-center row ">
            <h2 className="text-registrasi d-flex justify-content-center align-items-center">
              Registrasi Penjual
            </h2>
          </div>

          <div className="form-body-penjual d-flex justify-content-center row">
            <div className="row my-2 d-flex justify-content-center">
              <label htmlFor="nama_toko" id="label-input">
                Logo Toko
              </label>
            </div>
            <div className="row my-2 d-flex justify-content-start px-5 py-2">
              <div className="col-4">
                <div className="bg-foto-daftar-penjual mx-5 d-flex justify-content-center align-items-center">
                  {previewImg?.map((data, index) => {
                    return (
                      <img
                        className="foto-daftar-penjual"
                        src={`${data}`}
                        key={index}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
              <div className="col-4 px-5">
                <input
                  id="imageFile"
                  type="file"
                  style={{ color: "transparent" }}
                  multiple
                  onChange={onChangeFile}
                  accept="jpg/jpeg/png"
                  className="mx-5"
                />
              </div>
            </div>

            <div className="row my-2 d-flex justify-content-center">
              <label htmlFor="email" id="label-input">
                Email
              </label>
              <input
                className="input-text"
                type="text"
                placeholder="Masukan email anda..."
                id="email_penjual"
                value={dataInput.email_penjual}
                onChange={handleInput}
              />
            </div>

            <div className="row my-2 d-flex justify-content-center">
              <label htmlFor="password" id="label-input">
                Password
              </label>
              <input
                className="input-text mx-2"
                type={typePassword}
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

            <div className="row my-2 d-flex justify-content-center">
              <label htmlFor="nama_toko" id="label-input">
                Nama Toko
              </label>
              <input
                className="input-text"
                type="text"
                placeholder="Toko Serba Ada..."
                id="nama_toko"
                value={dataInput.nama_toko}
                onChange={handleInput}
              />
            </div>

            <div className="row my-2 d-flex justify-content-center">
              <label htmlFor="alamat" id="label-input">
                Alamat
              </label>
              <textarea
                className="input-text"
                type="text"
                placeholder=""
                id="alamat"
                value={dataInput.alamat}
                onChange={handleInput}
                style={{ height: "5em", resize: "none" }}
              />
            </div>

            <div className="row my-2 d-flex justify-content-center">
              <label htmlFor="no_rek_penjual" id="label-input">
                No Rekening
              </label>
              <input
                className="input-text"
                type="text"
                placeholder="69420xxxx"
                id="no_rek_penjual"
                value={dataInput.no_rek_penjual}
                onChange={handleInput}
              />
            </div>

            <div className="row my-2 d-flex justify-content-center">
              <label htmlFor="whatsapp" id="label-input">
                No Whatsapp
              </label>
              <input
                className="input-text"
                type="text"
                placeholder="08xxxx"
                id="whatsapp"
                value={dataInput.whatsapp}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-footer-penjual my-2 row d-flex justify-content-center align-items-end">
            <div className="col d-flex justify-content-end">
              <button
                className="btn but-daftar-form-penjual"
                onClick={handleDaftarPenjual}
              >
                Daftar!
              </button>
            </div>
          </div>
        </div>
      </div>
      {isAlertMerah ? (
        <AlertMerah
          textAlert={textAlert}
          isAlert={isAlertMerah}
          setIsAlert={setIsAlertMerah}
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
  );
};

export default Daftarpenjual1;
