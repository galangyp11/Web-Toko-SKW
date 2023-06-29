import NavbarTransaksi from "./NavbarTransaksi";

import './transaksipembeli.css'
import apiHost from "../../../constants/apiHost";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DetailTransaksi from "./DetailTransaksi";

const TransaksiPembeli = () => {
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
  const [dataSelesai, setDataSelesai] = useState([]);
  const [dataGambar, setDataGambar] = useState([]);
  
  const id = Cookies.get("id");

  useEffect(() => {
    const getNotif = async () => {
      const response = await axios.get(`${apiHost}transaksi/pembeli/${id}`);
      setDataKonfirmasi(response.data);
      console.log(response.data);
    };
    getNotif();

    const getNotifSelesai = async () => {
      const response = await axios.get(`${apiHost}transaksi/pembeli-selesai/${id}`);
      setDataSelesai(response.data);
      console.log(response.data);
    };
    getNotifSelesai();
  }, []);

  // useEffect(() => {
  //   const getNotif = async () => {
  //     const response = await axios.get(`${apiHost}transaksi/pembeli/${id}`);
  //     setDataKonfirmasi(response.data);
  //     console.log(response.data);
  //   };
  //   getNotif();
  // },[dataKonfirmasi, dataSelesai])

  // console.log({dataKonfirmasi});

  return (
    <div className="transaksi-pembeli">
      <div className="sticky-top">
        <NavbarTransaksi />
      </div>

      <section id="Dikrim">
        <div className="judul-pesananku container  my-2">
          <p className="text-judul-pesananku">Dikirim</p>
        </div>
        <div className="profilepembeli-con container">
          {dataKonfirmasi?.map((data, index) => {
            return(
              <DetailTransaksi data={data} index={index} key={index}/>
          )
          })}
        </div>
      </section>

      <hr className="container"/>
      <section id="Selesai">
        <div className="judul-pesananku container  my-2">
          <p className="text-judul-pesananku">Selesai</p>
        </div>
        <div className="profilepembeli-con container">
          {dataSelesai?.map((data, index) => {
            return(
              <DetailTransaksi data={data} index={index} key={index}/>
          )
          })}
        </div>
      </section>
    </div>
  );
};

export default TransaksiPembeli;
