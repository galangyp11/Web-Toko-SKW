import "./profiletoko.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import fotoKosing from "../../image/pp-kosong.png";
import axios from "axios";
import ProfileToko from "./ProfileToko";
import apiHost from "../../../constants/apiHost";
import Alert from "../../Alert/AlertHijau";
import AlertMerah from "../../Alert/AlertMerah";

const EditProfileToko = ({ setIsEdit }) => {
  const [penjualById, setPenjualById] = useState({});
  const [foto, setFoto] = useState();
  const id = Cookies.get("id");
  const [dataInput, setDataInput] = useState({
    id_penjual: "",
    nama_toko: "",
    email_penjual: "",
    password: "",
    alamat_toko: "",
    whatsapp: "",
    no_rek_penjual: "",
    logo_toko: [],
  });
  const [previewImg, setPreviewImg] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [isAlertMerah, setIsAlertMerah] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  useEffect(() => {
    const getItemById = async () => {
      const response = await axios.get(`${apiHost}penjual/${id}`);
      setPenjualById(response.data);
      console.log(response.data);
    };
    getItemById();
  }, [isAlert]);

  useEffect(() => {
    try {
      setFoto(
        btoa(
          String.fromCharCode(...new Uint8Array(penjualById?.logo_toko?.data))
        )
      );
    } catch (error) {
      console.log("load image...");
    }
  }, [penjualById]);

  const handleInput = (e) => {
    setDataInput((data) => ({ ...data, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    setDataInput((data) => ({
      ...data,
      id_penjual: id,
      nama_toko: penjualById?.nama_toko,
      email_penjual: penjualById?.email_penjual,
      password: penjualById?.password,
      alamat_toko: penjualById?.alamat_toko,
      whatsapp: penjualById?.whatsapp,
      no_rek_penjual: penjualById?.no_rek_penjual,
      logo_toko: penjualById?.logo_toko?.data,
    }));
  }, [penjualById]);

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

      Array.from(evt.target.files)?.forEach((imageFile) => {
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

  const handleSimpanPenjual = async (e) => {
    if (dataInput.nama_toko === "") {
      setIsAlertMerah(true);
      setTextAlert("Nama Toko Tidak Boleh Kosong");
    } else if (dataInput.email_penjual === "") {
      setIsAlertMerah(true);
      setTextAlert("Email Tidak Boleh Kosong");
    } else if (dataInput.password === "") {
      setIsAlertMerah(true);
      setTextAlert("Password Tidak Boleh Kosong");
    } else if (dataInput.whatsapp === "") {
      setIsAlertMerah(true);
      setTextAlert("Nomor Whatsapp Tidak Boleh Kosong");
    } else if (dataInput.alamat_toko === "") {
      setIsAlertMerah(true);
      setTextAlert("Alamat Tidak Boleh Kosong");
    } else if (dataInput.no_rek_penjual === "") {
      setIsAlertMerah(true);
      setTextAlert("No Rekening Tidak Boleh Kosong");
    } else {
      if (dataInput.logo_toko.length > 5) {
        await axios.put(`${apiHost}penjual-nofoto`, dataInput);
        setIsAlert(true);
        setTextAlert("Profile berhasil diubah");
        window.location.reload();
      } else if (dataInput.logo_toko.length === 1) {
        await axios.put(`${apiHost}penjual`, dataInput);
        setIsAlert(true);
        setTextAlert("Profile berhasil diubah");
        window.location.reload();
      }
    }
  };

  console.log(dataInput);

  return (
    <div className="edit-profile-toko">
      <div className="row profile-toko container p-4  d-flex justify-content-center">
        <div className="col-3 ">
          <div className="bg-foto-profile-penjual d-flex justify-content-center align-items-center">
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
                className="foto-profile-penjual"
                src={
                  penjualById?.logo_toko?.data.length === 0
                    ? fotoKosing
                    : `data:image/png;base64,${foto}`
                }
                alt=""
              />
            )}
          </div>
        </div>

        <div className="col p-5 ">
          <input
            id="imageFile"
            type="file"
            style={{ color: "transparent" }}
            onChange={onChangeFile}
            accept="jpg/png/jpeg"
          />
        </div>

        <div className="row ">
          <div className="col-2 ">
            <p className="text-profile-bio d-flex align-items-center">Toko</p>
          </div>

          <div className="col-1 ">
            <p className="text-profile-bio d-flex justify-content-center align-items-center">
              :
            </p>
          </div>

          <div className="col ">
            <input
              className="input-text d-flex align-items-center"
              placeholder={penjualById?.nama_toko}
              id="nama_toko"
              // value={dataInput.nama_toko}
              onChange={handleInput}
            ></input>
          </div>
        </div>

        <hr />
        <div className="row ">
          <div className="col-2 ">
            <p className="text-profile-bio d-flex align-items-center">Email</p>
          </div>

          <div className="col-1 ">
            <p className="text-profile-bio d-flex justify-content-center align-items-center">
              :
            </p>
          </div>

          <div className="col ">
            <input
              className="input-text d-flex align-items-center"
              placeholder={penjualById?.email_penjual}
              id="email_penjual"
              // value={dataInput.email_penjual}
              onChange={handleInput}
            ></input>
          </div>
        </div>
        <hr />

        <div className="row ">
          <div className="col-2 ">
            <p className="text-profile-bio d-flex align-items-center">
              Password
            </p>
          </div>

          <div className="col-1 ">
            <p className="text-profile-bio d-flex justify-content-center align-items-center">
              :
            </p>
          </div>

          <div className="col ">
            <input
              className="input-text d-flex align-items-center"
              placeholder={penjualById?.password}
              id="password"
              // value={dataInput.password}
              onChange={handleInput}
            ></input>
          </div>
        </div>
        <hr />

        <div className="row ">
          <div className="col-2 ">
            <p className="text-profile-bio d-flex align-items-center">Alamat</p>
          </div>

          <div className="col-1 ">
            <p className="text-profile-bio d-flex justify-content-center align-items-center">
              :
            </p>
          </div>

          <div className="col ">
            <textarea
              className="input-text d-flex align-items-center"
              placeholder={penjualById?.alamat_toko}
              id="alamat_toko"
              style={{ height: "5em", resize: "none" }}
              // value={dataInput.alamat_toko}
              onChange={handleInput}
            />
          </div>
        </div>
        <hr />

        <div className="row ">
          <div className="col-2 ">
            <p className="text-profile-bio d-flex align-items-center">
              Whatsapp
            </p>
          </div>

          <div className="col-1 ">
            <p className="text-profile-bio d-flex justify-content-center align-items-center">
              :
            </p>
          </div>

          <div className="col ">
            <input
              className="input-text d-flex align-items-center"
              placeholder={penjualById?.whatsapp}
              id="whatsapp"
              // value={dataInput.whatsapp}
              onChange={handleInput}
            ></input>
          </div>
        </div>
        <hr />

        <div className="row ">
          <div className="col-2 ">
            <p className="text-profile-bio d-flex align-items-center">
              No. Rekening
            </p>
          </div>

          <div className="col-1 ">
            <p className="text-profile-bio d-flex justify-content-center align-items-center">
              :
            </p>
          </div>

          <div className="col ">
            <input
              type="number"
              className="input-text d-flex align-items-center"
              placeholder={penjualById?.no_rek_penjual}
              id="no_rek_penjual"
              // value={dataInput.no_rek_penjual}
              onChange={handleInput}
            ></input>
          </div>
        </div>
        <hr />

        <div className="row ">
          <div className="col d-flex justify-content-end">
            <button
              className="btn btn-outline-danger but-tolak-pesanan"
              onClick={() => setIsEdit(false)}
            >
              Batal
            </button>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button
              className="but-input-item-penjual"
              onClick={handleSimpanPenjual}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
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
          <div></div>
        )}
      </div>
    </div>
  );
};

export default EditProfileToko;
