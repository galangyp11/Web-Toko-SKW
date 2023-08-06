import React from "react";
import { useState, useEffect } from "react";
import "./profilpembeliadmin.css";
import AlertKonfirmasiTolak from "./AlertKonfirmasiTolak";
import search from "../../image/search.png";
import axios from "axios";
import apiHost from "../../../constants/apiHost";

const ProfilPenjualAdmin = () => {
  const [datum, setDatum] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = currentPage - recordsPerPage;
  const [isAlertTolak, setIsAlertTolak] = useState(false);
  const [textAlert, setTextAlert] = useState();
  const [idTransaksi, setIdTransaksi] = useState("");

  useEffect(() => {
    const getDatumItem = async () => {
      const response = await axios.get(
        `${apiHost}pembeli?page=${currentPage}&limit=${recordsPerPage}`
      );
      setDatum(response.data);
    };
    getDatumItem();
  }, [isAlertTolak]);

  const handleDelete = async (e, data) => {
    e.preventDefault();
    setIdTransaksi(data.id_pembeli);
    setIsAlertTolak(true);
    setTextAlert(data);
  };

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCpage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }

  const onSearchItem = async ({ target: { value } }) => {
    console.log("val", value);
    const response = await axios.get(`${apiHost}pembeli?search=${value}`);
    setDatum(response.data);
  };

  console.log(datum);
  return (
    <div className="profil-pembeli-admin container-fluid">
      <div className="row">
        <p className="text-title-halaman">Profil Pembeli</p>
      </div>

      <div className="row">
        <div
          className="col-3 d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <input
            className="search-admin p-2 "
            type="text"
            placeholder="Search"
            onChange={onSearchItem}
          />
          <div
            className="col-1 d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <div className="logo-search-admin d-flex justify-content-center">
              <img className="p-1" src={search} alt="" />
            </div>
          </div>
        </div>
      </div>

      <table className="table my-5 table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">No Telepon</th>
            <th scope="col">Alamat</th>
            <th className="col-1" scope="col">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {datum?.map((data, index) => {
            return (
              <tr key={data.id_pembeli}>
                <td>{index + 1}</td>
                <td>{data.email}</td>
                <td>{data.username}</td>
                <td>{data.no_telp}</td>
                <td>{data.alamat}</td>
                <td className="p-1" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-danger but-tolak-pesanan"
                    onClick={(e) => handleDelete(e, data)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className="pagination d-flex align-items-end">
        <li className="page-item">
          <a href="#" className="page-link" onClick={prePage}>
            Prev
          </a>
        </li>
        {/* <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a href="#" className='page-link' onClick={changeCpage}>{n}</a>
                        </li>     */}

        <li className="page-item">
          <a href="#" className="page-link" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
      {isAlertTolak ? (
        <AlertKonfirmasiTolak
          textAlert={textAlert}
          isAlert={isAlertTolak}
          setIsAlert={setIsAlertTolak}
          idTransaksi={idTransaksi}
          setDatum={setDatum}
          datum={datum}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default ProfilPenjualAdmin;
