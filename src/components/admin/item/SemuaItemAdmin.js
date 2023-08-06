import { useState, useEffect } from "react";
import "./profilpembeliadmin.css";
import search from "../../image/search.png";
import axios from "axios";
import apiHost from "../../../constants/apiHost";
import AlertKonfirmasiTolak from "./AlertKonfirmasiTolak";

const SemuaItemAdmin = () => {
  const [datumItem, setDatumItem] = useState([]);
  const [totalItem, setTotalItem] = useState([]);
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
        `${apiHost}item?page=${currentPage}&limit=${recordsPerPage}`
      );
      setDatumItem(response.data);
    };
    getDatumItem();
  }, [currentPage, isAlertTolak]);

  useEffect(() => {
    const getTotalItem = async () => {
      const response = await axios.get(`${apiHost}total-item`);
      setTotalItem(response.data);
    };
    getTotalItem();
  }, []);

  const handleDelete = async (e, data) => {
    e.preventDefault();
    setIdTransaksi(data.id_item);
    setIsAlertTolak(true);
    setTextAlert(data);
  };

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  function prePage() {
    if (currentPage !== firstIndex && currentPage > 1) {
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
    const response = await axios.get(`${apiHost}item?search=${value}`);
    setDatumItem(response.data);
  };

  console.log(datumItem);
  return (
    <div className="semua-item-admin container-fluid">
      <div className="row">
        <p className="text-title-halaman">Item SKW</p>
      </div>

      <div className="row">
        <div
          className="col-3 d-flex justify-content-center align-items-center "
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
        <div
          className="col d-flex justify-content-end "
          style={{ height: "2em" }}
        >
          <p className="text-info-admin d-flex align-items-center mx-2">
            Total Jumlah Item :{" "}
          </p>
          <p className="text-info-admin-data d-flex justify-content-center align-items-center px-2">
            {totalItem.length}
          </p>
        </div>
      </div>

      <table class="table my-4 table-bordered">
        <thead className="table-dark">
          <tr>
            <th className="col-1 text-center" scope="col">
              No
            </th>
            <th className="col-3" scope="col">
              Nama Item
            </th>
            <th className="col-1" scope="col">
              Kategori
            </th>
            <th className="col-1" scope="col">
              Harga
            </th>
            <th className="col-2" scope="col">
              Toko
            </th>
            <th className="col-1" scope="col">
              Stok
            </th>
            <th className="col-1" scope="col">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {datumItem.map((item, index) => {
            return (
              <tr key={item.id_item}>
                <td className="text-center">{index + 1}</td>
                <td>{item.nama_item}</td>
                <td>{item.nama_kategori}</td>
                <td>{formatUang(item.harga_item).replace(/\,00/g, "")}</td>
                <td>{item.nama_toko}</td>
                <td>{item.stok_item}</td>
                <td className="p-1" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-danger but-tolak-pesanan"
                    onClick={(e) => handleDelete(e, item)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className="pagination d-flex justify-content-center">
        <li className="page-item">
          <a href="#" className="page-link" onClick={prePage}>
            Prev
          </a>
        </li>

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
          setDatum={setDatumItem}
          datum={datumItem}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SemuaItemAdmin;
