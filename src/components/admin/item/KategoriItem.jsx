import { useEffect, useState } from "react";
import "./kategoriitem.css";
import search from "../../image/search.png";
import axios from "axios";
import apiHost from "../../../constants/apiHost";
import { RxCross2 } from "react-icons/rx";
import AlertKonfirmasiTolak from "./AlertKonfirmasiTolak";
import AlertHijau from "../../Alert/AlertHijau";

const KategoriItem = () => {
  const [datumKategori, setDatumKategori] = useState([]);
  const [isTambah, setIsTambah] = useState(false);
  const [isButTambah, setIsButTambah] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [inputKategori, setInputKategori] = useState({
    id_kategori: "",
    nama_kategori: "",
    foto_kategori: "",
  });
  const [previewImg, setPreviewImg] = useState([]);
  const [isAlertTolak, setIsAlertTolak] = useState(false);
  const [textAlert, setTextAlert] = useState();
  const [isAlertHijau, setIsAlertHijau] = useState(false);
  const [textAlertHijau, setTextAlertHijau] = useState();
  const [idTransaksi, setIdTransaksi] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${apiHost}kategori`);
      setDatumKategori(response.data);
    };
    getData();
  }, [isTambah, isEdit, isAlertTolak]);

  const handleTambah = (e) => {
    e.preventDefault();
    setIsButTambah(false);
    setIsTambah(true);
    setIsEdit(false);
  };

  const handleEdit = async (e, id, nama) => {
    e.preventDefault();
    setIsButTambah(false);
    setIsTambah(false);
    setIsEdit(true);
    setInputKategori((data) => ({
      ...data,
      id_kategori: id,
      nama_kategori: nama,
    }));
  };

  const handleDelete = async (e, data) => {
    e.preventDefault();
    setIdTransaksi(data.id_kategori);
    setIsAlertTolak(true);
    setTextAlert(data);
  };

  const handleInputKategori = (e) => {
    e.preventDefault();
    setInputKategori((data) => ({
      ...data,
      nama_kategori: e.target.value,
    }));
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    await axios.post(`${apiHost}kategori`, inputKategori);
    setIsButTambah(true);
    setIsTambah(false);
    document.getElementById("imageFile").value = "";
    setInputKategori({
      id_kategori: "",
      nama_kategori: "",
      foto_kategori: "",
    });
    setIsAlertHijau(true);
    setTextAlertHijau("Kategori berhasil ditambah");
  };

  const handleSimpanEdit = async (e) => {
    e.preventDefault();
    await axios.put(`${apiHost}kategori`, inputKategori);
    setIsButTambah(true);
    setIsEdit(false);
    document.getElementById("imageFile").value = "";
    setInputKategori({
      id_kategori: "",
      nama_kategori: "",
      foto_kategori: "",
    });
    setIsAlertHijau(true);
    setTextAlertHijau("Kategori berhasil diubah");
  };

  const handleBatal = () => {
    setIsButTambah(true);
    setIsTambah(false);
    setIsEdit(false);
    document.getElementById("imageFile").value = "";
    setInputKategori({
      id_kategori: "",
      nama_kategori: "",
      foto_kategori: "",
    });
  };
  const onSearchItem = async ({ target: { value } }) => {
    console.log("val", value);
    const response = await axios.get(`${apiHost}kategori?search=${value}`);
    setDatumKategori(response.data);
  };

  const handleDeleteFoto = (e, index2) => {
    const dataFilterInputKategori = Array.from(
      inputKategori.foto_kategori
    )?.filter((data, index) => index !== index2);
    setInputKategori((data) => ({
      ...data,
      foto_kategori: dataFilterInputKategori,
    }));

    const dataFilterPreviewImg = previewImg?.filter(
      (data, index) => index !== index2
    );
    setPreviewImg(dataFilterPreviewImg);

    e.target.value = "";
  };

  const onChangeFile = async (evt) => {
    console.log("evt", evt.target.files);
    if (evt.target.files.length > 4) {
      alert("maksimum upload 4 file");
      document.getElementById("imageFile").value = "";
      setInputKategori((data) => ({ ...data, foto_kategori: [] }));
      return false;
    }

    if (evt.target.files.length > 0) {
      const foto_kategori = [];

      Array.from(evt.target.files).forEach((imageFile) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const srcData = fileReader.result;
          foto_kategori.push(srcData);
        };
        fileReader.readAsDataURL(imageFile);
      });

      setInputKategori((data) => ({ ...data, foto_kategori }));
    }

    const images = [];
    Array.from(evt.target.files)?.forEach(async (d) => {
      images.push(URL.createObjectURL(d));
    });
    console.log("imgs", images);
    setPreviewImg(images);
  };

  console.log(inputKategori);
  return (
    <div className="kategori-item container-fluid">
      <div className="row">
        <p className="text-title-halaman">Kategori Item</p>
      </div>

      <div className="row">
        <div
          className="col-3 d-flex justify-content-start align-items-center"
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
          className="col d-flex justify-content-start align-items-center"
          style={{ height: "100%" }}
        >
          <p className="text-info-admin d-flex align-items-center mx-2">
            Total Kategori Item :{" "}
          </p>
          <p className="text-info-admin-data d-flex justify-content-center align-items-center px-2">
            {datumKategori.length}
          </p>
        </div>

        <div
          className="col d-flex justify-content-end align-items-center"
          style={{ height: "100%" }}
        >
          {isButTambah ? (
            <button
              className="but-input-item-penjual"
              style={{ width: "11em" }}
              onClick={handleTambah}
            >
              Tambah Kategori
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {isTambah ? (
        <div className="container bg-input-kategori my-3 p-3">
          <p className="text-judul-kategori">Tambah Kategori</p>

          <hr />
          <div className="row d-flex align-items-center">
            <div className="col mx-5 px-4 ">
              <input
                id="imageFile"
                type="file"
                style={{ color: "transparent" }}
                multiple
                onChange={onChangeFile}
                accept="image/png"
              />
            </div>
          </div>

          <div className="row my-2 d-flex align-items-center">
            <div className="col-4">
              {previewImg?.map((item, index) => {
                return (
                  <div
                    className="row d-flex align-items-center my-1"
                    style={{ height: "100%" }}
                  >
                    <div className="col">
                      <div className="input-gambar-item">
                        <img
                          className="input-gambar-item-edit"
                          src={`${item}`}
                          alt=""
                          key={index}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <RxCross2
                        color="grey"
                        size="30px"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => handleDeleteFoto(e, index)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-2 " style={{ height: "100%" }}>
              <p className="text-input-kategori d-flex align-items-center">
                Nama Kategori
              </p>
            </div>
            <div className="col">
              <input
                type="text"
                className="input-text"
                onChange={handleInputKategori}
              />
            </div>
            <div className="col-2 d-flex justify-content-end">
              <button
                className="btn btn-outline-danger"
                style={{ height: "2.3em", width: "7em" }}
                onClick={handleBatal}
              >
                Batal
              </button>
            </div>
            <div className="col-2 d-flex justify-content-end">
              <button className="but-input-item-penjual" onClick={handleSimpan}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {isEdit ? (
        <div className="container bg-input-kategori my-3 p-3">
          <p className="text-judul-kategori">Edit Kategori</p>

          <hr />
          <div className="row d-flex align-items-center my-1">
            <div className="col mx-5 px-4 ">
              <input
                id="imageFile"
                type="file"
                style={{ color: "transparent" }}
                multiple
                onChange={onChangeFile}
                accept="image/png"
              />
            </div>
          </div>

          <div className="row d-flex align-items-center">
            <div className="col-4">
              {previewImg?.map((item, index) => {
                return (
                  <div
                    className="row d-flex align-items-center my-1"
                    style={{ height: "100%" }}
                  >
                    <div className="col">
                      <div className="input-gambar-item">
                        <img
                          className="input-gambar-item-edit"
                          src={`${item}`}
                          alt=""
                          key={index}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <RxCross2
                        color="grey"
                        size="30px"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => handleDeleteFoto(e, index)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-2 " style={{ height: "100%" }}>
              <p className="text-input-kategori d-flex align-items-center">
                Nama Kategori
              </p>
            </div>
            <div className="col">
              <input
                type="text"
                className="input-text"
                placeholder={inputKategori.nama_kategori}
                onChange={handleInputKategori}
              />
            </div>
            <div className="col-2 d-flex justify-content-end">
              <button
                className="btn btn-outline-danger"
                style={{ height: "2.3em", width: "7em" }}
                onClick={handleBatal}
              >
                Batal
              </button>
            </div>
            <div className="col-2 d-flex justify-content-end">
              <button
                className="but-input-item-penjual"
                onClick={handleSimpanEdit}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <table class="table my-4 table-bordered">
        <thead className="table-dark">
          <tr>
            <th className="col-1 text-center" scope="col">
              No
            </th>
            <th className="col-3" scope="col">
              Nama kategori
            </th>
            <th className="col-1 text-center" scope="col" colSpan="2">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {datumKategori.map((item, index) => {
            return (
              <tr key={item.id_kategori}>
                <td className="text-center">{index + 1}</td>
                <td>{item.nama_kategori}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-warning but-tolak-pesanan"
                    onClick={(e) =>
                      handleEdit(e, item.id_kategori, item.nama_kategori)
                    }
                  >
                    Edit
                  </button>
                </td>
                <td style={{ textAlign: "center" }}>
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
      {isAlertTolak ? (
        <AlertKonfirmasiTolak
          textAlert={textAlert}
          isAlert={isAlertTolak}
          setIsAlert={setIsAlertTolak}
          idTransaksi={idTransaksi}
          setDatum={setDatumKategori}
          datum={datumKategori}
        />
      ) : (
        <div></div>
      )}
      {isAlertHijau ? (
        <AlertHijau
          textAlert={textAlertHijau}
          isAlert={isAlertHijau}
          setIsAlert={setIsAlertHijau}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default KategoriItem;
