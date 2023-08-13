import "./pagepenjual.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiHost from "../../constants/apiHost";
import axios from "axios";
import Cookies from "js-cookie";

import NavbarPenjual from "./NavbarPenjual";
import SidebarPenjual from "./SidebarPenjual";
import ProfileToko from "./profile/ProfileToko";
import InputItem from "./page/Item/InputItem";

const PagePenjual = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState();
  const [dataPenjual, setDataPenjual] = useState([]);
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
  const [dataProses, setDataProses] = useState([]);
  const id = Cookies.get("id");

  useEffect(() => {
    const getPenjual = async () => {
      const response = await axios.get(`${apiHost}penjual/${id}`);
      setDataPenjual(response.data);
    };
    getPenjual();

    const getNotif = async () => {
      const response = await axios.get(
        `${apiHost}transaksi-notif/penjual/${id}`
      );
      setDataKonfirmasi(response.data);
    };
    getNotif();

    const getProsesPesanan = async () => {
      const response = await axios.get(
        `${apiHost}transaksi-proses/penjual/${id}`
      );
      setDataProses(response.data);
    };
    getProsesPesanan();

    setPage(<ProfileToko dataPenjual={dataPenjual} />);
  }, []);

  return (
    <div className="page-penjual">
      <div className="row" style={{ width: "100%", height: "100dvh" }}>
        <div className="col-2 p-0">
          <div className=" sticky-top">
            <SidebarPenjual
              setPage={setPage}
              dataKonfirmasi={dataKonfirmasi}
              dataProses={dataProses}
            />
          </div>
        </div>

        <div className="col container py-3">
          <div className="page-menu d-flex justify-content-center">{page}</div>
        </div>
      </div>
    </div>
  );
};

export default PagePenjual;
