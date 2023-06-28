import NavbarTransaksi from "./NavbarTransaksi";

import './transaksipembeli.css'
import apiHost from "../../../constants/apiHost";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DetailTransaksi from "./DetailTransaksi";

const TransaksiPembeli = () => {
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
  
  const id = Cookies.get("id");

  useEffect(() => {
    const getNotif = async () => {
      const response = await axios.get(`${apiHost}transaksi/pembeli/${id}`);
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

      <div className="profilepembeli-con container py-5">
        {dataKonfirmasi?.map((data, index) => {
          return(
            <DetailTransaksi data={data} index={index} key={index}/>
         )
        })}
      </div>
    </div>
  );
};

export default TransaksiPembeli;
