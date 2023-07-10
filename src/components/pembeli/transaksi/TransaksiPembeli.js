import NavbarTransaksi from "./NavbarTransaksi";

import "./transaksipembeli.css";
import apiHost from "../../../constants/apiHost";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DetailTransaksi from "./DetailTransaksi";
import { RxDividerVertical } from "react-icons/rx";

const TransaksiPembeli = () => {
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
  const [dataSelesai, setDataSelesai] = useState([]);
  const [dataGambar, setDataGambar] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const id = Cookies.get("id");

  useEffect(() => {
    const getNotif = async () => {
      const response = await axios.get(`${apiHost}transaksi/pembeli/${id}`);
      setDataKonfirmasi(response.data);
      console.log(response.data);
    };
    getNotif();

    const getNotifSelesai = async () => {
      const response = await axios.get(
        `${apiHost}transaksi/pembeli-selesai/${id}`
      );
      setDataSelesai(response.data);
      console.log(response.data);
    };
    getNotifSelesai();
  }, []);

  return (
    <div className="transaksi-pembeli">
      <div className="sticky-top">
        <NavbarTransaksi />
      </div>

      <div className="judul-pesananku container my-2">
        <div className="row ">
          <div className="col-1">
            <p
              className={
                !isActive
                  ? "text-judul-pesananku"
                  : "text-judul-pesananku-notactive"
              }
              onClick={() => setIsActive(false)}
            >
              Dikirim
            </p>
          </div>

          <div className="col-1 d-flex justify-content-center py-1">
            <p style={{ color: "grey", fontSize: "1.2em" }}>|</p>
          </div>

          <div className="col">
            <p
              className={
                isActive
                  ? "text-judul-pesananku"
                  : "text-judul-pesananku-notactive"
              }
              onClick={() => setIsActive(true)}
            >
              Selesai
            </p>
          </div>
        </div>
      </div>

      {!isActive ? (
        <div className="profilepembeli-con container">
          {dataKonfirmasi?.map((data, index) => {
            return <DetailTransaksi data={data} index={index} key={index} />;
          })}
        </div>
      ) : (
        <div className="profilepembeli-con container">
          {dataSelesai?.map((data, index) => {
            return <DetailTransaksi data={data} index={index} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default TransaksiPembeli;
