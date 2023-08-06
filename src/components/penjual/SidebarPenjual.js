import "./sidebarpenjual.css";
import { IoStorefront } from "react-icons/io5";
import { BiCollection } from "react-icons/bi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import NotifPesanan from "./page/NotifPesanan";
import ProfileToko from "./profile/ProfileToko";
import ItemToko from "./page/Item/ItemToko";
import PageItemToko from "./page/PageItemToko";
import ProsesPesanan from "./page/ProsesPesanan";

const SidebarPenjual = ({ setPage, dataKonfirmasi, dataProses }) => {
  let navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("id");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <div className="sidebar-penjual pt-4 px-3">
      <div className="logo-skw-sidebar pt-1 px-2 mx-3 d-flex">
        <p
          className="text-logo-skw-admin d-flex align-items-center"
          onClick={() => navigate("/penjual")}
        >
          SKW
        </p>
        <p className="text-skw-penjual d-flex align-items-center">Penjual</p>
      </div>

      <hr />

      <div className="sidebar-item">
        <div
          className="sidebar-title d-flex align-items-center"
          onClick={() => setPage(<ProfileToko />)}
        >
          <IoStorefront className="icon-title" color="white" size="30px" />
          <p className="text-sidebar-admin-title pt-3" id="text-sidebar-admin">
            Profile Toko
          </p>
        </div>
      </div>

      <div className="sidebar-item">
        <div
          className="sidebar-title d-flex align-items-center"
          onClick={() => setPage(<ItemToko setPage={setPage} />)}
        >
          <BiCollection className="icon-title" color="white" size="30px" />
          <p className="text-sidebar-admin-title pt-3" id="text-sidebar-admin">
            Item Toko
          </p>
        </div>
      </div>

      <div className="sidebar-item">
        <div className="sidebar-title d-flex align-items-center">
          <p
            className="text-sidebar-admin-title pt-3"
            id="text-sidebar-admin"
            onClick={() => setPage(<ProsesPesanan />)}
          >
            Pesanan diproses
          </p>
          <div className="bg-text-notif-pesanan d-flex justify-content-center">
            <p className="text-notif-pesanan">{dataProses.length}</p>
          </div>
        </div>
      </div>

      <div className="sidebar-item">
        <div className="sidebar-title d-flex align-items-center">
          <p
            className="text-sidebar-admin-title pt-3"
            id="text-sidebar-admin"
            onClick={() => setPage(<NotifPesanan />)}
          >
            Pesanan Masuk
          </p>
          <div className="bg-text-notif-pesanan d-flex justify-content-center">
            <p className="text-notif-pesanan">{dataKonfirmasi.length}</p>
          </div>
        </div>
      </div>

      <div className="my-5 d-flex justify-content-center">
        <button className="but-logout-admin" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarPenjual;
