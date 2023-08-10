import "./notifpesanan.css";
import { useState, useEffect } from "react";
import AlertKonfirmasiTolak from "./AlertKonfirmasiTolak";
import AlertKonfirmasiTerima from "./AlertKonfirmasiTerima";
import axios from "axios";
import apiHost from "../../constants/apiHost";

const NotifPesanan = () => {
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
  const [isAlertTolak, setIsAlertTolak] = useState(false);
  const [isAlertKonfirmasi, setIsAlertKonfirmasi] = useState(false);
  const [textAlert, setTextAlert] = useState();
  const [idTransaksi, setIdTransaksi] = useState("");

  useEffect(() => {
    const getNotif = async () => {
      const response = await axios.get(`${apiHost}konfirmasi`);
      setDataKonfirmasi(response.data);
    };
    getNotif();
  }, [isAlertKonfirmasi, isAlertTolak]);

  const handleTolak = (e, data) => {
    e.preventDefault();
    setIdTransaksi(data.id_konfirmasi);
    setIsAlertTolak(true);
    setTextAlert(data);
  };

  const handleKonfirmasi = (e, data) => {
    e.preventDefault();
    setIdTransaksi(data.id_konfirmasi);
    setIsAlertKonfirmasi(true);
    setTextAlert(data);
  };

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  console.log(dataKonfirmasi);

  return (
    <div className="notif-pesanan container-fluid">
      <p className="text-title-halaman">Konfirmasi Pembayaran Pesanan</p>

      <div className="row">
        <p className="text-alert-notif-pesanan">
          MOHON untuk cek dengan benar-benar teliti sebelum KONFIRMASI pensanan
          !
          <p className="text-pemberitahuan-notif-pesanan">
            Konfirmasi pesanan secepatnya agar segera diproses oleh penjual
          </p>
        </p>
      </div>

      <div className="row ">
        <table className="table my-5 table-bordered">
          <thead className="table-dark table-striped">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Pembayaran</th>
              <th scope="col">Nominal Harga</th>
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
            {dataKonfirmasi.map((data) => {
              return (
                <tr key={data.id_transaksi}>
                  <td>{data.username}</td>
                  <td>{data.nama_mp}</td>
                  <td>
                    {formatUang(data.total_harga_transaksi).replace(
                      /\,00/g,
                      ""
                    )}
                  </td>
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
                      Konfirmasi
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
            setDataKonfirmasi={setDataKonfirmasi}
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
