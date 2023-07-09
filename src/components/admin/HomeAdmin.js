import { useEffect, useState } from "react";
import "./homeadmin.css";
import axios from "axios";
import apiHost from "../../constants/apiHost";
import Cookies from "js-cookie";
import { BsDash } from "react-icons/bs";
import MetodePembayaran from "./InfoAdmin/MetodePembayaran";
import DataAdmin from "./InfoAdmin/DataAdmin";

const HomeAdmin = () => {
  const [dataPembeli, setDataPembeli] = useState([]);
  const [dataPenjual, setDataPenjual] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const [dataAdmin, setDataAdmin] = useState({});
  const id = Cookies.get("id");

  useEffect(() => {
    const getPembeli = async () => {
      const response = await axios.get(`${apiHost}pembeli`);
      setDataPembeli(response.data);
    };
    getPembeli();

    const getPenjual = async () => {
      const response = await axios.get(`${apiHost}penjual`);
      setDataPenjual(response.data);
    };
    getPenjual();

    const getItem = async () => {
      const response = await axios.get(`${apiHost}total-item`);
      setDataItem(response.data);
    };
    getItem();

    const getAdmin = async () => {
      const response = await axios.get(`${apiHost}admin/${id}`);
      setDataAdmin(response.data);
    };
    getAdmin();
  }, []);

  // useEffect(()=>{
  //     setUsername(dataAdmin[0].username)
  // },[dataAdmin])

  console.log({
    dataAdmin,
  });

  return (
    <div className="home-admin p-3 container-fluid">
      <div className="d-flex gap-3">
        <p className="text-home-admin">Selamat Datang</p>
        <p className="text-username-home-admin">{dataAdmin.username}</p>
      </div>

      <div className="d-flex justify-content-center">
        <div className="bg-info-skw-admin p-3 d-flex align-items-center gap-2">
          <p className="text-info-skw-admin">Saat ini telah terdaftar</p>
          <p className="text-info-skw-data-admin">{dataPenjual.length}</p>
          <p className="text-info-skw-admin">pengguna toko dan</p>
          <p className="text-info-skw-data-admin">{dataPembeli.length}</p>
          <p className="text-info-skw-admin">
            pengguna pembeli. Seluruh item yang tersedia pada SKW ini berjumlah{" "}
          </p>
          <p className="text-info-skw-data-admin">{dataItem.length}</p>
          <p className="text-info-skw-admin">item</p>
        </div>
      </div>

      <div className="row ">
        <div className="col ">
          <DataAdmin />
        </div>

        <div className="col">
          <MetodePembayaran />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
