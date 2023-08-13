import { useEffect, useState } from "react";
import "./alertkonfirmasi.css";
import { Modal } from "react-bootstrap";
import axios from "axios";
import apiHost from "../../../constants/apiHost";

const AlertKonfirmasiTolak = ({
  textAlert,
  isAlert,
  setIsAlert,
  idTransaksi,
  dataKonfirmasi,
  setDataKonfirmasi,
}) => {
  const [dataInput, setDataInput] = useState({
    status_transaksi: "Pesanan ditolak",
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
    await axios.put(`${apiHost}transaksi-penjual/${idTransaksi}`, dataInput);
    await axios.put(`${apiHost}item-stok`, stokAwal);
    setIsAlert(false);
    // window.location.reload()
  };

  const handleBatal = () => {
    setIsAlert(false);
  };

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
          Tolak Pesanan
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
