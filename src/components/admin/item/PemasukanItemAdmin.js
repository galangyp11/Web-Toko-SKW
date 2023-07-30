import { useState, useEffect } from "react";
import "./profilpembeliadmin.css";
import search from "../../image/search.png";
import axios from "axios";
import apiHost from "../../../constants/apiHost";

const PemasukanItemAdmin = () => {
  const [datumItem, setDatumItem] = useState([]);
  const [datumRiwayatMasuk, setDatumRiwayatMasuk] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = currentPage - recordsPerPage;

  useEffect(() => {
    const getDatumItem = async () => {
      const response = await axios.get(
        `${apiHost}riwayat-item-masuk?page=${currentPage}&limit=${recordsPerPage}`
      );
      setDatumItem(response.data);
    };
    getDatumItem();
  }, [currentPage]);

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
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
    const response = await axios.get(
      `${apiHost}riwayat-item-masuk?search=${value}`
    );
    setDatumItem(response.data);
  };

  console.log({
    datumItem,
  });
  return (
    <div className="pemasukan-item-admin container-fluid">
      <div className="row">
        <p className="text-title-halaman">Riwayat Item Masuk</p>
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
        <div className="col d-flex justify-content-end">
          <ul>
            <li>
              <p
                className="teks-info-stok-masuk lh-1"
                style={{ color: "grey" }}
              >
                {" "}
                Stok dengan warna Hijau = penambahan stok
              </p>
            </li>
            <li>
              <p
                className="teks-info-stok-masuk lh-1"
                style={{ color: "grey" }}
              >
                {" "}
                Stok dengan warna Kuning = perubahan stok
              </p>
            </li>
          </ul>
        </div>
      </div>

      <table className="table my-5 table-bordered">
        <thead className="table-dark">
          <tr>
            <th className="col-1 text-center" scope="col">
              No
            </th>
            <th className="col-2" scope="col">
              Nama Item
            </th>
            <th className="col-1" scope="col">
              Harga
            </th>
            <th className="col-2" scope="col">
              Toko
            </th>
            <th className="col-1" scope="col">
              Stok Awal
            </th>
            <th className="col-1" scope="col">
              Stok Masuk
            </th>
            <th className="col-1" scope="col">
              Stok Toko
            </th>
            <th className="col-2" scope="col">
              Tanggal
            </th>
          </tr>
        </thead>
        <tbody>
          {datumItem.map((item, index) => {
            let stokUbah;

            if (item.stok_ubah === "null") {
              stokUbah = (
                <td className="text-stok-masuk">{item.stok_tambah}</td>
              );
            } else if (item.stok_tambah === "null") {
              stokUbah = <td className="text-stok-ubah">{item.stok_ubah}</td>;
            } else {
              stokUbah = <td>-</td>;
            }

            return (
              <tr key={item.id_riwayat}>
                <td className="text-center">{index + 1}</td>
                <td>{item.nama_item}</td>
                <td>{formatUang(item.harga_item).replace(/\,00/g, "")}</td>
                <td>{item.nama_toko}</td>
                <td>{item.stok_awal}</td>
                {stokUbah}
                <td className="text-stok-toko">{item.stok_toko}</td>
                <td>{item.tanggal}</td>
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
    </div>
  );
};

export default PemasukanItemAdmin;
