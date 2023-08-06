import NavbarTransaksi from "./NavbarTransaksi";

import "./transaksipembeli.css";
import apiHost from "../../../constants/apiHost";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DetailTransaksi from "./DetailTransaksi";
import { RxDividerVertical } from "react-icons/rx";
import DetailKonfrimasi from "./DetaliKonfirmasi";

const TransaksiPembeli = () => {
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
  const [dataDikirim, setDataDikirim] = useState([]);
  const [dataSelesai, setDataSelesai] = useState([]);
  const [isKonfirmasi, setIsKonfirmasi] = useState(true);
  const [isDikirim, setIsDikirim] = useState(false);
  const [isSelesai, setIsSelesai] = useState(false);
  const [listItem, setListItem] = useState();

  const id = Cookies.get("id");

  useEffect(() => {
    const getDataKonfirmasi = async () => {
      const response = await axios.get(`${apiHost}konfirmasi/${id}`);
      setDataKonfirmasi(response.data);
    };
    getDataKonfirmasi();

    const getDataDikirim = async () => {
      const response = await axios.get(`${apiHost}transaksi/pembeli/${id}`);
      setDataDikirim(response.data);
    };
    getDataDikirim();

    const getNotifSelesai = async () => {
      const response = await axios.get(
        `${apiHost}transaksi/pembeli-selesai/${id}`
      );
      setDataSelesai(response.data);
    };
    getNotifSelesai();
  }, [isKonfirmasi, isDikirim, isSelesai]);

  useEffect(() => {
    if (isKonfirmasi === true) {
      setListItem(
        dataKonfirmasi.map((data, index) => {
          return <DetailKonfrimasi data={data} index={index} key={index} />;
        })
      );
    }
  }, [dataKonfirmasi]);

  const handleKonfirmasi = (e) => {
    e.preventDefault();

    setIsKonfirmasi(true);
    setIsDikirim(false);
    setIsSelesai(false);
    setListItem(
      dataKonfirmasi?.map((data, index) => {
        return <DetailKonfrimasi data={data} index={index} key={index} />;
      })
    );
  };

  const handleDikirim = (e) => {
    e.preventDefault();

    setIsKonfirmasi(false);
    setIsDikirim(true);
    setIsSelesai(false);
    setListItem(
      dataDikirim?.map((data, index) => {
        return <DetailTransaksi data={data} index={index} key={index} />;
      })
    );
  };

  const handleSelesai = (e) => {
    e.preventDefault();

    setIsKonfirmasi(false);
    setIsDikirim(false);
    setIsSelesai(true);
    setListItem(
      dataSelesai?.map((data, index) => {
        return <DetailTransaksi data={data} index={index} key={index} />;
      })
    );
  };

  console.log({ dataDikirim, dataKonfirmasi, dataSelesai });

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
                isKonfirmasi
                  ? "text-judul-pesananku"
                  : "text-judul-pesananku-notactive"
              }
              onClick={handleKonfirmasi}
            >
              Konfirmasi
            </p>
          </div>

          <div className="col-1 d-flex justify-content-center py-1">
            <p style={{ color: "grey", fontSize: "1.2em" }}>|</p>
          </div>

          <div className="col-1">
            <p
              className={
                isDikirim
                  ? "text-judul-pesananku"
                  : "text-judul-pesananku-notactive"
              }
              onClick={handleDikirim}
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
                isSelesai
                  ? "text-judul-pesananku"
                  : "text-judul-pesananku-notactive"
              }
              onClick={handleSelesai}
            >
              Selesai
            </p>
          </div>
        </div>
      </div>

      <div className="data-pesananku container">{listItem}</div>
    </div>
  );
};

export default TransaksiPembeli;
