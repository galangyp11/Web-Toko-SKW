import "./notifpesanan.css";
import { useState, useEffect } from "react";
import AlertKonfirmasiTolak from "./AlertKonfirmasiTolak";
import AlertKonfirmasiTerima from "./AlertKonfirmasiTerima";
import axios from "axios";
import Cookies from "js-cookie";
import apiHost from "../../../constants/apiHost";

const NotifPesanan = () => {
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
  const [isAlertTolak, setIsAlertTolak] = useState(false);
  const [isAlertKonfirmasi, setIsAlertKonfirmasi] = useState(false);
  const [textAlert, setTextAlert] = useState({
    username: "",
    nama_item: "",
    jumlah_beli: "",
    id_pembeli: "",
    id_penjual: "",
    id_item: "",
    id_transaksi: "",
    tanggal: "",
  });
  const [idTransaksi, setIdTransaksi] = useState("");
  const id = Cookies.get("id");

  useEffect(() => {
    const getNotif = async () => {
      const response = await axios.get(
        `${apiHost}transaksi-notif/penjual/${id}`
      );
      setDataKonfirmasi(response.data);
    };
    getNotif();
  }, [isAlertKonfirmasi, isAlertTolak]);

  const handleTolak = (e, data) => {
    e.preventDefault();
    setIdTransaksi(data.id_transaksi);
    setIsAlertTolak(true);
    setTextAlert((item) => ({
      ...item,
      username: data.username,
      nama_item: data.nama_item,
      jumlah_beli: data.jumlah_beli,
    }));
  };

  const handleKonfirmasi = (e, data) => {
    e.preventDefault();
    setIdTransaksi(data.id_transaksi);
    setIsAlertKonfirmasi(true);
    setTextAlert((item) => ({
      ...item,
      username: data.username,
      nama_item: data.nama_item,
      jumlah_beli: data.jumlah_beli,
      id_pembeli: data.id_pembeli,
      id_penjual: data.id_penjual,
      id_item: data.id_item,
      id_transaksi: data.id_transaksi,
      tanggal: data.waktu_pesan,
    }));
  };

  console.log({ dataKonfirmasi });
  return (
    <div className="notif-pesanan container-fluid">
      <p className="text-title-halaman">Konfirmasi Proses Pesanan</p>

      <div className="row">
        <p className="text-alert-notif-pesanan">
          MOHON untuk cek dengan benar-benar teliti sebelum KIRIM pensanan !
        </p>
        <p className="text-pemberitahuan-notif-pesanan">
          Proses pesanan secepatnya
        </p>
      </div>

      <div className="row ">
        <table className="table my-5 table-bordered">
          <thead className="table-dark table-striped ">
            <tr>
              <th className="col-1" scope="col">
                No
              </th>
              <th scope="col">Username Pembeli</th>
              <th scope="col">Item</th>
              <th className="col-1" scope="col">
                Jumlah
              </th>
              <th className="col-2" scope="col">
                Alamat
              </th>
              <th className="col-1" scope="col">
                Waktu
              </th>
              <th
                className="col-2"
                scope="col"
                colSpan="2"
                style={{ textAlign: "center" }}
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dataKonfirmasi?.map((data, index) => {
              return (
                <tr key={data.id_transaksi}>
                  <td>{index + 1}</td>
                  <td>{data.username}</td>
                  <td>{data.nama_item}</td>
                  <td>{data.jumlah_beli}</td>
                  <td>{data.alamat}</td>
                  <td>{data.waktu_pesan}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-danger but-tolak-pesanan"
                      onClick={(e) => handleTolak(e, data)}
                    >
                      Tolak
                    </button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-primary but-konfirmasi-pesanan"
                      onClick={(e) => handleKonfirmasi(e, data)}
                    >
                      Terima Pesanan
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        {isAlertTolak ? (
          <AlertKonfirmasiTolak
            textAlert={textAlert}
            isAlert={isAlertTolak}
            setIsAlert={setIsAlertTolak}
            idTransaksi={idTransaksi}
            dataKonfirmasi={dataKonfirmasi}
          />
        ) : (
          <div></div>
        )}
        {isAlertKonfirmasi ? (
          <AlertKonfirmasiTerima
            textAlert={textAlert}
            isAlert={isAlertKonfirmasi}
            setIsAlert={setIsAlertKonfirmasi}
            idTransaksi={idTransaksi}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default NotifPesanan;
