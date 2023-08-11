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
}) => {
  const [dataInput, setDataInput] = useState({
    status_transaksi: "Pesanan sedang dikemas",
  });

  const handleKonfirmasi = async () => {
    await axios.put(`${apiHost}transaksi-penjual/${idTransaksi}`, dataInput);
    await axios.post(`${apiHost}riwayat-item-keluar`, textAlert);
    setIsAlert(false);
    // window.location.reload()
  };

  const handleBatal = () => {
    setIsAlert(false);
  };

  console.log({ dataInput, textAlert });

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
          Konfirmasi Pesanan
        </p>
        <hr />
        <div className="data-table d-flex align-items-center justify-content-center">
          <table style={{ width: "70%" }}>
            <thead>
              <tr>
                <td className="col-3 table-head-konfirmasi">Username</td>
                <td className="col-1">:</td>
                <td className="col-4">{textAlert.username}</td>
              </tr>
              <tr>
                <td className="col-3 table-head-konfirmasi">Item</td>
                <td className="col-1">:</td>
                <td className="col-4">{textAlert.nama_item}</td>
              </tr>
              <tr>
                <td className="col-3 table-head-konfirmasi">Jumlah</td>
                <td className="col-1">:</td>
                <td className="col-4">{textAlert.jumlah_beli}</td>
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
            className="but-konfirmasi btn btn-primary"
            onClick={handleKonfirmasi}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertKonfirmasiTerima;
