import { useLocation, useNavigate } from "react-router-dom";
import "./FormBermasalah.css";
import emailjs from "@emailjs/browser";
import apiHost from "../../../constants/apiHost";
import { useEffect, useState } from "react";
import Alert from "../../Alert/AlertMerah";
import AlertHijau from "../../Alert/AlertHijau";

const FormBermasalah = () => {
  const dataUrl = useLocation();
  const [dataInput, setDataInput] = useState({
    email: "",
    item: "",
    statusTransaksi: "",
    pesan: "",
    idTransaksi: "",
    tanggal: "",
  });
  const [isAlert, setIsAlert] = useState(false);
  const [isAlertHijau, setIsAlertHijau] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDataInput((data) => ({
      ...data,
      tanggal: dataUrl.state.data.waktu_pesan,
      email: dataUrl.state.data.email,
      item: dataUrl.state.data.nama_item,
      statusTransaksi: dataUrl.state.data.status_transaksi,
      idTransaksi: dataUrl.state.data.id_transaksi,
    }));
  }, []);

  const handleInput = (e) => {
    e.preventDefault();

    setDataInput((data) => ({ ...data, pesan: e.target.value }));
  };

  const handleKirim = (e) => {
    e.preventDefault();
    if (dataInput.pesan === "") {
      setIsAlert(true);
      setTextAlert("Alasan Bermasalah Tidak Boleh Kosong");
    } else {
      emailjs
        .send(
          "service_66ojacq",
          "template_3qd2vde",
          dataInput,
          "w3RTvXknr0E_40EQG"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      setIsAlertHijau(true);
      setTextAlert("Form Berhasil Dikirim");
      setTimeout(() => {
        navigate("/pesanan");
      }, 1500);
    }
  };
  console.log(dataInput);
  return (
    <div className="form-bermasalah container d-flex justify-content-center align-items-center">
      <div className="bg-form-bermasalah container px-5">
        <div className="row" style={{ height: "3em" }}>
          <p className="teks-form-bermasalah d-flex justify-content-center  p-2 ">
            Form Pesanan Bermasalah
          </p>
        </div>
        <hr />

        <div className="row">
          <div className="col-1">
            <p>1.</p>
          </div>
          <div className="col">
            <img
              src={`${apiHost}${dataUrl.state.data.gambar}`}
              className="gambar-item-pesanan-bermasalah"
            />
          </div>
          <div className="col">
            <p>{dataUrl.state.data.nama_item}</p>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <div className="d-flex gap-2">
              <p>Jumlah :</p>
              <p>{dataUrl.state.data.jumlah_beli}</p>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-3">
            <p>Status Transaksi</p>
          </div>
          <div className="col">
            <p>:</p>
          </div>
          <div className="col d-flex justify-content-end">
            <p>{dataUrl.state.data.status_transaksi}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <p>Alasan Bermasalah</p>
          </div>
          <div className="col">
            <p>:</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <textarea
              className="input-text"
              style={{ height: "10em", width: "30em", resize: "none" }}
              onChange={handleInput}
            />
          </div>
          <div className="col d-flex justify-content-end">
            <p style={{ color: "grey" }}>
              Sertakan penjelasan masalah lengkap agar proses cepat dan mudah.
            </p>
          </div>
        </div>

        <hr />
        <div className="row px-2" style={{ height: "3em" }}>
          <div className="col">
            <button
              className="btn btn-outline-danger"
              style={{ height: "2.5em", width: "10em" }}
              onClick={() => navigate("/pesanan")}
            >
              Batal
            </button>
          </div>
          <div className="col d-flex justify-content-end">
            <button
              className="btn btn-primary"
              style={{ height: "2.5em", width: "10em" }}
              onClick={handleKirim}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
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
  );
};

export default FormBermasalah;
