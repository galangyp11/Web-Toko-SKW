import "./keranjang.css";
import { useState, useEffect } from "react";
import apiHost from "../../../constants/apiHost";
import axios from "axios";
import { MdKeyboardArrowRight } from "react-icons/md";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

import FooterKeranjang from "./FooterKeranjang";
import ItemsKeranjang from "./ItemsKeranjang";
import NavbarKeranjang from "./NavbarKeranjang";
import Alert from "../../Alert/AlertMerah";

const Keranjang = () => {
  const [datum, setDatum] = useState([]);
  const [dataInput, setDataInput] = useState({
    id_keranjang: "",
    jumlah: "",
    total_harga: "",
  });
  const [totalHarga, setTotalHarga] = useState();
  const [isKosong, setIsKosong] = useState(true);
  const id = Cookies.get("id");
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  useEffect(() => {
    dataDB();
  }, [dataInput]);

  const dataDB = async () => {
    const response = await axios.get(`${apiHost}keranjang/${id}`);
    setDatum(response.data);
  };

  useEffect(() => {
    if (datum?.length != 0) {
      setIsKosong(false);
    } else {
      setIsKosong(true);
      setTotalHarga(0);
    }

    let i = 0;
    datum?.forEach((data) => {
      i += data.total_harga;
      setTotalHarga(i);
    });
  }, [datum, dataInput]);

  useEffect(() => {
    const putData = async () => {
      await axios.put(`${apiHost}keranjang`, dataInput);
    };
    putData();
  }, [dataInput]);

  const handleCheckout = async (e) => {
    if (isKosong === true) {
      setIsAlert(true);
      setTextAlert("Keranjang kamu kosong");
    } else {
      navigate("/checkout");
    }
  };

  // console.log(isKosong)
  // console.log('datum:',datum)
  // console.log(dataInput)
  // console.log(`total harga : ${totalHarga}`)

  return (
    <div className="keranjang">
      <div className="sticky-top">
        <NavbarKeranjang />
      </div>

      <div className="keranjang-con container mt-2">
        <div className="breadcrumbs d-flex">
          <Link className="breadcrumbs-not-active" to="/">
            Beranda
          </Link>
          <p className="breadcrumbs-active">
            <MdKeyboardArrowRight />
            Keranjang
          </p>
        </div>
        <div className="row">
          <div className="col">
            {isKosong ? (
              <p className="text-keranjang-kosong d-flex justify-content-center align-items-center">
                Keranjang Kosong
              </p>
            ) : (
              <div>
                {datum.map((item) => {
                  return (
                    <ItemsKeranjang
                      item={item}
                      datum={datum}
                      setDatum={setDatum}
                      setDataInput={setDataInput}
                      dataDB={dataDB}
                      // disable={disable}
                      // refJumlah={refJumlah}
                      // handleTambah={handleTambah}
                      // handleKurang={handleKurang}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <div className="col-4 sticky-top">
            <FooterKeranjang
              datum={datum}
              isKosong={isKosong}
              handleCheckout={handleCheckout}
              totalHarga={totalHarga}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {isAlert ? (
          <Alert
            textAlert={textAlert}
            isAlert={isAlert}
            setIsAlert={setIsAlert}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Keranjang;
