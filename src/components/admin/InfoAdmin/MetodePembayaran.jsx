import axios from "axios";
import { useEffect, useState } from "react";
import apiHost from "../../../constants/apiHost";
import AlertHijau from "../../Alert/AlertHijau";
import AlertMerah from "../../Alert/AlertMerah";
import EditMP from "./EditMP";
import { LuEdit } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const MetodePembayaran = () => {
  const [dataMetodePembayaran, setDataMetodePembayaran] = useState([]);
  const [dataInput, setDataInput] = useState({
    nama_mp: "",
    no_mp: "",
  });
  const [isTambahMP, setIsTambahMP] = useState(false);
  const [isAlertHijau, setIsAlertHijau] = useState(false);
  const [isAlertMerah, setIsAlertMerah] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  useEffect(() => {
    const getMp = async () => {
      const response = await axios.get(`${apiHost}metode_pembayaran`);
      setDataMetodePembayaran(response.data);
    };
    getMp();
  }, [isTambahMP, isAlertHijau]);

  const handleInput = (e) => {
    e.preventDefault();

    setDataInput((data) => ({
      ...data,
      [e.target.id]: e.target.value,
    }));
  };

  const handleTambahMP = (e) => {
    e.preventDefault();

    setIsTambahMP(true);
  };

  const handleSimpanMP = async (e) => {
    e.preventDefault();

    await axios.post(`${apiHost}metode_pembayaran`, dataInput);
    setIsAlertHijau(true);
    setTextAlert("Metode pembayaran berhasil ditambahkan");
    setIsTambahMP(false);
  };

  const handleBatalMP = (e) => {
    e.preventDefault();

    setIsTambahMP(false);
  };

  console.log({
    dataInput,
    dataMetodePembayaran,
  });

  return (
    <div className="metode-pembayaran">
      <div className="bg-info-data-admin my-3 p-3">
        <p className="text-judul-data-admin">Metode Pembayaran</p>
        <hr />
        {dataMetodePembayaran?.map((data, index) => {
          return (
            <EditMP
              setIsAlertHijau={setIsAlertHijau}
              setIsAlertMerah={setIsAlertMerah}
              setTextAlert={setTextAlert}
              data={data}
              key={index}
              dataMetodePembayaran={dataMetodePembayaran}
              setDataMetodePembayaran={setDataMetodePembayaran}
            />
          );
        })}

        {isTambahMP ? (
          <div>
            <p className="text-mp-data-admin">Tambah Metode Pembayaran</p>
            <div className="bg-data-info row">
              <div className="col-4">
                <input
                  type="text"
                  id="nama_mp"
                  className="input-text"
                  placeholder="Nama metode pembayaran"
                  style={{ width: "10em" }}
                  onChange={handleInput}
                />
              </div>
              <div className="col-1 p-0">
                <p>:</p>
              </div>
              <div className="col-3">
                <input
                  type="number"
                  id="no_mp"
                  className="input-text"
                  placeholder="Nomor metode pembayaran"
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="row my-2">
          <div className="col d-flex justify-content-center">
            {isTambahMP ? (
              <div className="row">
                <div className="col">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleBatalMP}
                    style={{ width: "11em" }}
                  >
                    Batal
                  </button>
                </div>
                <div className="col">
                  <button
                    className="but-input-item-penjual"
                    onClick={handleSimpanMP}
                    style={{ width: "11em" }}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="but-input-item-penjual"
                onClick={handleTambahMP}
                style={{ width: "11em" }}
              >
                Tambah Metode
              </button>
            )}
          </div>
        </div>
      </div>
      {isAlertHijau ? (
        <AlertHijau
          textAlert={textAlert}
          isAlert={isAlertHijau}
          setIsAlert={setIsAlertHijau}
        />
      ) : (
        <div></div>
      )}
      {isAlertMerah ? (
        <AlertMerah
          textAlert={textAlert}
          isAlert={isAlertMerah}
          setIsAlert={setIsAlertMerah}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MetodePembayaran;
