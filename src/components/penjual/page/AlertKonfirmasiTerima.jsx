import { useEffect, useState } from "react";
import "./alertkonfirmasi.css";
import { Modal } from "react-bootstrap";
import axios from "axios";
import apiHost from "../../../constants/apiHost";

const AlertKonfirmasiTerima = ({
  textAlert,
  isAlert,
  setIsAlert,
  idTransaksi,
  dataInput,
}) => {
  const handleKonfirmasi = async () => {
    await axios.put(`${apiHost}transaksi-penjual/${idTransaksi}`, dataInput);
    setIsAlert(false);
    // window.location.reload()
  };

  const handleBatal = () => {
    setIsAlert(false);
  };

  console.log(dataInput);

  return (
    <Modal className="modal-md" show={isAlert} animation={true}>
      <div className="container">
        <div className="bg-alert-konfirmasi py-3">
          <p className="text-alert-konfirmasi d-flex justify-content-center align-items-center ">
            {textAlert}
          </p>
        </div>
        <hr />
        <div className="row mb-2 px-5">
          <div className="col d-flex justify-content-center">
            <button
              className="but-konfirmasi btn btn-outline-secondary "
              onClick={handleBatal}
            >
              Batal
            </button>
          </div>
          <div className="col d-flex justify-content-center">
            <button
              className="but-konfirmasi btn btn-primary"
              onClick={handleKonfirmasi}
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AlertKonfirmasiTerima;
