import { useEffect, useState } from "react";
import "./alertkonfirmasi.css";
import { Modal } from "react-bootstrap";
import axios from "axios";
import apiHost from "../../constants/apiHost";

const AlertKonfirmasiTolak = ({
  textAlert,
  isAlert,
  setIsAlert,
  idTransaksi,
  dataKonfirmasi,
  setDataKonfirmasi,
}) => {
  const [dataInput, setDataInput] = useState({
    status_pembayaran: "Pembayaran ditolak",
  });

  const [stokAwal, setStokAwal] = useState({
    id_item: "",
    stok_item: "",
  });

  useEffect(() => {
    dataKonfirmasi.map((data) => {
      setStokAwal((stok) => ({
        ...stok,
        id_item: data.id_item,
        stok_item: +data.jumlah_beli + +data.stok_item,
      }));
    });
  }, []);

  console.log(stokAwal);

  const handleTolak = async () => {
    await axios.put(`${apiHost}transaksi-tolak/${idTransaksi}`, dataInput);
    await axios.delete(`${apiHost}transaksi-delete/${idTransaksi}`);
    await axios.put(`${apiHost}item-stok`, stokAwal);
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
            className="but-konfirmasi btn btn-danger"
            onClick={handleTolak}
          >
            Tolak
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertKonfirmasiTolak;
