import "./pageadmin.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";
import axios from "axios";
import HomeAdmin from "./HomeAdmin";
import apiHost from "../../constants/apiHost";

const PageAdmin = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState();
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);

  useEffect(() => {
    const getNotif = async () => {
      const response = await axios.get(`${apiHost}konfirmasi`);
      setDataKonfirmasi(response.data);
    };
    getNotif();

    setPage(<HomeAdmin />);
  }, []);

  return (
    <div className="page-admin">
      <div className="row" style={{ width: "100%", height: "100dvh" }}>
        <div
          className="col-2 p-0"
          style={{ backgroundColor: "#2C3333", height: "102vh" }}
        >
          <div className="sticky-top d-flex align-items-start">
            <SidebarAdmin setPage={setPage} dataKonfirmasi={dataKonfirmasi} />
          </div>
        </div>

        <div className="col container py-3">
          <div className="page-menu d-flex justify-content-center">{page}</div>
        </div>
      </div>
    </div>
  );
};

export default PageAdmin;
