import { useEffect, useState } from "react";
import "./alertkonfirmasi.css";
import { Modal } from "react-bootstrap";
import axios from "axios";
import apiHost from "../../constants/apiHost";

const AlertKonfirmasiTerima = ({
  textAlert,
  isAlert,
  setIsAlert,
  idTransaksi,
}) => {
  const [dataInput, setDataInput] = useState({
    status_transaksi: "Pesanan diteruskan ke penjual",
  });

  const handleKonfirmasi = async () => {
    await axios.put(`${apiHost}transaksi/${idTransaksi}`, dataInput);
    setIsAlert(false);
    // window.location.reload()
  };

  const handleBatal = () => {
    setIsAlert(false);
  };

  return (
    <Modal className="modal-alert" show={isAlert} animation={true} size="md">
      <div className="bg-alert-konfirmasi px-5 py-2">
        <p className="text-alert-konfirmasi d-flex justify-content-center align-items-center ">
          {textAlert}
        </p>
      </div>
      <div className="row my-1 px-4">
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
