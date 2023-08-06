import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import apiHost from "../../../constants/apiHost";
import Alert from "../../Alert/AlertHijau";
import AlertMerah from "../../Alert/AlertMerah";

const HalamanEdit = ({ setIsEdit }) => {
  const [pembeliById, setPembeliById] = useState({});
  const [foto, setFoto] = useState();
  const id = Cookies.get("id");
  const [dataInput, setDataInput] = useState({
    username: "",
    email: "",
    password: "",
    alamat: "",
    no_telp: "",
    foto_profil: [],
  });
  const [previewImg, setPreviewImg] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [isAlertMerah, setIsAlertMerah] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  useEffect(() => {
    const getItemById = async () => {
      const response = await axios.get(`${apiHost}pembeli/${id}`);
      setPembeliById(response.data);
    };
    getItemById();
  }, []);

  const onChangeFile = async (evt) => {
    console.log("evt", evt.target.files);
    if (evt.target.files.length > 1) {
      alert("maksimum upload 1 file");
      document.getElementById("imageFile").value = "";
      setDataInput((data) => ({ ...data, foto_profil: [] }));
      return false;
    }

    if (evt.target.files.length > 0) {
      const foto_profil = [];

      Array.from(evt.target.files)?.forEach((imageFile) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const srcData = fileReader.result;
          foto_profil.push(srcData);
        };
        fileReader.readAsDataURL(imageFile);
      });

      setDataInput((data) => ({ ...data, foto_profil }));
    }

    const images = [];
    Array.from(evt.target.files)?.forEach(async (d) => {
      images.push(URL.createObjectURL(d));
    });
    console.log("imgs", images);
    setPreviewImg(images);
  };

  const handleInput = (e) => {
    setDataInput((data) => ({ ...data, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    // const fotoInput = [];

    // // const image64 = `data:image/png;base64,`;
    // const fotoBuffer = pembeliById?.foto_profil?.data?.toString("base64");
    // // fotoInput.push(image64 + btoa(fotoBuffer));
    // fotoInput.push(bufferToDataUrl("image/png", fotoBuffer));

    setDataInput((data) => ({
      ...data,
      id_pembeli: id,
      email: pembeliById?.email,
      password: pembeliById?.password,
      alamat: pembeliById?.alamat,
      username: pembeliById?.username,
      no_telp: pembeliById?.no_telp,
      foto_profil: pembeliById?.foto_profil?.data,
    }));

    try {
      setFoto(
        btoa(
          String.fromCharCode(...new Uint8Array(pembeliById?.foto_profil?.data))
        )
      );
    } catch (error) {
      console.log("load image...");
    }
  }, [pembeliById]);

  const handleSimpan = async (e) => {
    e.preventDefault();

    if (dataInput.username === "") {
      setIsAlertMerah(true);
      setTextAlert("Username Tidak Boleh Kosong");
    } else if (dataInput.email === "") {
      setIsAlertMerah(true);
      setTextAlert("Email Tidak Boleh Kosong");
    } else if (dataInput.password === "") {
      setIsAlertMerah(true);
      setTextAlert("Password Tidak Boleh Kosong");
    } else if (dataInput.no_telp === "") {
      setIsAlertMerah(true);
      setTextAlert("Nomor Telepon Tidak Boleh Kosong");
    } else if (dataInput.alamat === "") {
      setIsAlertMerah(true);
      setTextAlert("Alamat Tidak Boleh Kosong");
    } else {
      if (dataInput.foto_profil.length > 5) {
        await axios.put(`${apiHost}pembeli-nofoto`, dataInput);
        setIsAlert(true);
        setTextAlert("Profile berhasil diubah");
        window.location.reload();
      } else if (dataInput.foto_profil.length === 1) {
        await axios.put(`${apiHost}pembeli`, dataInput);
        setIsAlert(true);
        setTextAlert("Profile berhasil diubah");
        window.location.reload();
      }
    }
  };

  console.log({
    previewImg,
    dataInput,
    pembeliById,
  });
  return (
    <div className="info-pembeli row my-3">
      <div className="col-5 px-5" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="row d-flex justify-content-center align-items-end">
            <div className="bg-foto-profile-pembeli d-flex justify-content-center align-items-center">
              {previewImg?.length !== 0 ? (
                previewImg?.map((data, index) => {
                  return (
                    <img
                      className="foto-profile"
                      src={`${data}`}
                      key={index}
                      alt=""
                    />
                  );
                })
              ) : (
                <img
                  className="foto-profile"
                  style={{ height: "270px", width: "270px" }}
                  src={`data:image/png;base64,${foto}`}
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                id="imageFile"
                type="file"
                style={{ color: "transparent" }}
                onChange={onChangeFile}
                accept="jpg/png/jpeg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col p-0">
        <div className="profile-card-kanan px-3 d-flex align-items-center">
          <div className="row gap-2 container">
            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Username
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <input
                  className="input-text d-flex align-items-center"
                  placeholder={pembeliById?.username}
                  id="username"
                  onChange={handleInput}
                ></input>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Email
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <input
                  className="input-text d-flex align-items-center"
                  placeholder={pembeliById?.email}
                  id="email"
                  onChange={handleInput}
                ></input>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Password
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <input
                  className="input-text d-flex align-items-center"
                  placeholder={pembeliById?.password}
                  id="password"
                  onChange={handleInput}
                ></input>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Nomor Telepon
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <input
                  className="input-text d-flex align-items-center"
                  placeholder={pembeliById?.no_telp}
                  id="no_telp"
                  onChange={handleInput}
                ></input>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Alamat
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <textarea
                  className="input-text d-flex align-items-center"
                  placeholder={pembeliById?.alamat}
                  id="alamat"
                  onChange={handleInput}
                  style={{ height: "5em", resize: "none" }}
                />
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col d-flex justify-content-end">
                <button
                  className="btn btn-outline-danger but-tolak-pesanan"
                  onClick={() => setIsEdit(false)}
                >
                  Batal
                </button>
              </div>
              <div className="col-3 d-flex justify-content-end">
                <button
                  className="but-input-item-penjual"
                  onClick={handleSimpan}
                >
                  Simpan
                </button>
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
          {isAlert ? (
            <Alert
              textAlert={textAlert}
              isAlert={isAlert}
              setIsAlert={setIsAlert}
              setIsEdit={setIsEdit}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalamanEdit;
