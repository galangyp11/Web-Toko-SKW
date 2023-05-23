import NavbarTransaksi from "./NavbarTransaksi";

import apiHost from "../../../constants/apiHost";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const TransaksiPembeli = () => {
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
  const id = Cookies.get("id");

  useEffect(() => {
    const getNotif = async () => {
      const response = await axios.get(`${apiHost}/transaksi/pembeli/${id}`);
      setDataKonfirmasi(response.data);
      console.log(response.data);
    };
    getNotif();
  }, []);

  console.log(dataKonfirmasi);

  return (
    <div className="transaksi-pembeli">
      <div className="sticky-top">
        <NavbarTransaksi />
      </div>

      <div className="profilepembeli-con container">
        <div className="row ">
          <table class="table my-5 table-bordered">
            <thead className="table-dark table-striped">
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Pembayaran</th>
                <th scope="col">Nominal Harga</th>
                <th scope="col">Waktu</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {dataKonfirmasi.map((data) => {
                return (
                  <tr key={data.id_konfirmasi}>
                    <td>{data.nama_item}</td>
                    <td>{data.nama_mp}</td>
                    <td>{data.harga_item}</td>
                    <td>{data.waktu_pesan}</td>
                    <td>{data.status_transaksi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransaksiPembeli;
