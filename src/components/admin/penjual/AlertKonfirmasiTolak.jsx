import { useEffect, useState } from "react";
import "./alertkonfirmasi.css";
import { Modal } from "react-bootstrap";
import axios from "axios";
import apiHost from "../../../constants/apiHost";

const AlertKonfirmasiTolak = ({
  textAlert,
  isAlert,
  setIsAlert,
  setDatum,
  datum,
}) => {
  const handleTolak = async (e) => {
    e.preventDefault();
    await axios.delete(`${apiHost}penjual/${textAlert.id_penjual}`);
    const dataFillter = datum.filter(
      (item) => item.id_penjual !== textAlert.id_penjual
    );
    setDatum(dataFillter);
    setIsAlert(false);
  };

  const handleBatal = () => {
    setIsAlert(false);
  };

  console.log(textAlert);

  return (
    <Modal
      className="modal-md"
      show={isAlert}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-body px-5 py-3">
        <p className="text-alert-konfirmasi d-flex justify-content-center align-items-center ">
          Hapus Akun Pembeli
        </p>
        <hr />
        <div className="data-table d-flex align-items-center justify-content-center">
          <table style={{ width: "70%" }}>
            <thead>
              <tr>
                <td className="col-3 table-head-konfirmasi">Toko</td>
                <td className="col-1">:</td>
                <td className="col-4">{textAlert.nama_toko}</td>
              </tr>
              <tr>
                <td className="col-3 table-head-konfirmasi">Email</td>
                <td className="col-1">:</td>
                <td className="col-4">{textAlert.email_penjual}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="row my-1 px-4 py-3">
        <div className="col">
          <button
            className="but-konfirmasi btn btn-outline-secondary "
            onClick={handleBatal}
          >
            Batal
          </button>
        </div>
        <div className="col d-flex justify-content-end">
          <button
            className="but-konfirmasi btn btn-danger"
            onClick={handleTolak}
          >
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertKonfirmasiTolak;
