import { useState, useEffect } from "react";
import "./profilpembeliadmin.css";
import search from "../../image/search.png";
import axios from "axios";
import apiHost from "../../../constants/apiHost";

const ProfilPenjualAdmin = () => {
  const [datumPenjual, setDatumPenjual] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = currentPage - recordsPerPage;

  useEffect(() => {
    const getDatumItem = async () => {
      const response = await axios.get(
        `${apiHost}penjual?page=${currentPage}&limit=${recordsPerPage}`
      );
      setDatumPenjual(response.data);
    };
    getDatumItem();
  }, [currentPage]);

  const handleDelete = async(e, id) =>{
    e.preventDefault()
    await axios.delete(`${apiHost}penjual/${id}`);
    const dataFillter = datumPenjual.filter((item) => item.id_penjual !== id);
    setDatumPenjual(dataFillter);
  }

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
    const response = await axios.get(`${apiHost}penjual?search=${value}`);
    setDatumPenjual(response.data);
  };

  console.log(datumPenjual)
  return (
    <div className="container-fluid">
      <div className="row">
        <p className="text-title-halaman">Profile Penjual</p>
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
            <th scope="col">Toko</th>
            <th scope="col">Alamat</th>
            <th className="text-center" scope="col">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {datumPenjual?.map((data, index) => {
            return (
              <tr key={data.id_penjual}>
                <td>{index +1}</td>
                <td>{data.email}</td>
                <td>{data.nama_toko}</td>
                <td>{data.alamat_toko}</td>
                <td style={{ textAlign: "center" }}>
                  <button className="btn btn-danger but-tolak-pesanan" onClick={(e) =>handleDelete(e, data.id_penjual)}>
                    Hapus
                  </button>
                </td>
              </tr>
            )
          }) }
        </tbody>
      </table>

      <ul className='pagination d-flex justify-content-center'>
          <li className='page-item'>
            <a href="#" className='page-link' onClick={prePage}>Prev</a>
          </li>
                  
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>Next</a>
          </li>
      </ul>
    </div>
  );
};

export default ProfilPenjualAdmin;
