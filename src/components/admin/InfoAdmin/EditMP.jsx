import axios from "axios";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import apiHost from "../../../constants/apiHost";
import { LuEdit } from "react-icons/lu";
import AlertKonfirmasiTolak from "./AlertKonfirmasiTolak";

const EditMP = ({
  data,
  dataMetodePembayaran,
  setDataMetodePembayaran,
  setIsAlertHijau,
  setIsAlertMerah,
  setTextAlert,
}) => {
  const [dataEdit, setDataEdit] = useState({
    nama_mp: "",
    no_mp: "",
  });
  const [isEditMP, setIsEditMP] = useState(false);
  const [isAlertTolak, setIsAlertTolak] = useState(false);
  const [dataAlert, setDataAlert] = useState();
  const [idTransaksi, setIdTransaksi] = useState("");

  const handleInput = (e) => {
    e.preventDefault();

    setDataEdit((data) => ({
      ...data,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSimpanEditMP = async (e, id) => {
    e.preventDefault();

    if (dataEdit.nama_mp === "") {
      setIsAlertMerah(true);
      setTextAlert("Nama metode pembayaran tidak boleh kosong!");
    } else if (dataEdit.no_mp === "") {
      setIsAlertMerah(true);
      setTextAlert("Nomor metode pembayaran tidak boleh kosong!");
    } else {
      await axios.put(`${apiHost}metode_pembayaran/${id}`, dataEdit);
      setIsAlertHijau(true);
      setTextAlert("Data berhasil diubah");
      setIsEditMP(false);
    }
  };

  const handleBatalMP = (e) => {
    e.preventDefault();

    setIsEditMP(false);
  };

  const handleEditMP = (e) => {
    e.preventDefault();

    setIsEditMP(true);
  };

  const handleDeleteMP = async (e, data) => {
    e.preventDefault();
    setIdTransaksi(data.id_mp);
    setIsAlertTolak(true);
    setDataAlert(data);
  };

  console.log({ dataEdit });
  return (
    <div className="edit-mp">
      <div className="">
        {!isEditMP ? (
          <div className="bg-data-info row">
            <div className="col-3">
              <p className="text-data-info">{data.nama_mp}</p>
            </div>
            <div className="col-1 p-0">
              <p>:</p>
            </div>
            <div className="col-4">
              <input
                type="number"
                className="input-text"
                placeholder={data.no_mp}
                disabled
                style={{ width: "12em" }}
              />
            </div>
            <div className="col-2 ">
              <div className="row d-flex align-items-center">
                <div className="col-1">
                  <LuEdit
                    style={{ cursor: "pointer" }}
                    size="1.2em"
                    onClick={(e) => handleEditMP(e)}
                  />
                </div>
                <div className="col-1">
                  <RxCross2
                    style={{ cursor: "pointer" }}
                    size="1.2em"
                    onClick={(e) => handleDeleteMP(e, data)}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-data-info row" key={data.id_mp}>
              <div className="col-3">
                <input
                  type="text"
                  id="nama_mp"
                  className="input-text"
                  placeholder={data.nama_mp}
                  style={{ width: "8em" }}
                  onChange={handleInput}
                />
              </div>
              <div className="col-1 p-0">
                <p>:</p>
              </div>
              <div className="col-4">
                <input
                  type="number"
                  id="no_mp"
                  className="input-text"
                  placeholder={data.no_mp}
                  style={{ width: "12em" }}
                  onChange={handleInput}
                />
              </div>
              <div className="col d-flex align-items-center">
                <div className="row gap-2 d-flex align-items-center">
                  <div className="col-5">
                    <button
                      className="btn btn-dark"
                      onClick={(e) => handleSimpanEditMP(e, data.id_mp)}
                    >
                      Simpan
                    </button>
                  </div>
                  <div className="col-5">
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleBatalMP}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isAlertTolak ? (
        <AlertKonfirmasiTolak
          textAlert={dataAlert}
          isAlert={isAlertTolak}
          setIsAlert={setIsAlertTolak}
          idTransaksi={idTransaksi}
          setDatum={setDataMetodePembayaran}
          datum={dataMetodePembayaran}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EditMP;
