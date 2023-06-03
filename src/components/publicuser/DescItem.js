import "./descitem.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import apiHost from "../../constants/apiHost";
import AlertHijau from "../AlertHijau";
import AlertMerah from "../AlertMerah";

import KuraPlongo from "../image/kuraplongo.jpg";

const DescItem = () => {
  const [itemById, setItemById] = useState({});
  const [cekItemKeranjang, setCekItemKeranjang] = useState([]);
  const [idItemKeranjang, setIdItemKeranjang] = useState();
  const [foto, setFoto] = useState();
  const id_pembeli = Cookies.get("id");
  const { id } = useParams();
  const [dataItem, setDataItem] = useState({
    id_pembeli: "",
    id_item: "",
    jumlah: "1",
    total_harga: "",
  });
  const [isAlertHijau, setIsAlertHijau] = useState(false);
  const [isAlertMerah, setIsAlertMerah] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  useEffect(() => {
    const getItemById = async () => {
      const response = await axios.get(`${apiHost}item/${id}`);
      setItemById(response.data);
    };
    getItemById();

    window.scrollTo(0, 0);
    setDataItem((data) => ({ ...data, id_pembeli: id_pembeli, id_item: id }));

    const getKeranjang = async () => {
      const response = await axios.get(`${apiHost}keranjang/${id_pembeli}`);
      setCekItemKeranjang(response.data);
    };
    if (id_pembeli !== undefined) {
      getKeranjang();
    }
  }, []);

  const handleKeranjang = async (e) => {
    e.preventDefault();
    if (id_pembeli === undefined) {
      setIsAlertMerah(true);
      setTextAlert("Silahkan Login dahulu");
    } else if (idItemKeranjang === itemById.id_item) {
      setIsAlertMerah(true);
      setTextAlert("Item sudah ada di keranjang");
    } else {
      try {
        await axios.post(`${apiHost}keranjang`, dataItem);
        setIsAlertHijau(true);
        setTextAlert("Item dimasukkan ke keranjang");
        window.location.reload();
        console.log("bisa kog");
      } catch (error) {
        console.log("eror bang gabisa input");
      }
    }
  };

  useEffect(() => {
    if (cekItemKeranjang && cekItemKeranjang?.length) {
      cekItemKeranjang?.map((data) => {
        setIdItemKeranjang(data.id_item);
      });
    }
  }, [handleKeranjang]);

  useEffect(() => {
    setDataItem((data) => ({ ...data, total_harga: itemById.harga_item * 1 }));
  }, [itemById]);

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  // setTimeout(()=>{
  //     try {
  //         setFoto(btoa(String.fromCharCode(...new Uint8Array(itemById.foto_item.data))))
  //     } catch (error) {
  //         console.log('sabar bang fotonya lagi loading')
  //     }
  // }, 100)
  // console.log(idItemKeranjang)
  // console.log(cekItemKeranjang)
  console.log(dataItem);
  console.log(itemById);

  return (
    <div className="descitem">
      <div className="desc-item-con container ">
        <div className="row pt-4" style={{ overflow: "hidden" }}>
          <div className="col d-flex justify-content-center">
            <div className="">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-mdb-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={KuraPlongo}
                      className="carousel-foto-item d-block"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={KuraPlongo}
                      className="carousel-foto-item d-block"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={KuraPlongo}
                      className="carousel-foto-item d-block"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={KuraPlongo}
                      className="carousel-foto-item d-block"
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-mdb-target="#carouselExampleIndicators"
                  data-mdb-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-mdb-target="#carouselExampleIndicators"
                  data-mdb-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
                <div className="carousel-indicators-desc d-flex justify-content-center">
                  <button
                    className="thumbnail-carousel-desc active"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                  >
                    <img src={KuraPlongo} className="d-block w-100" />
                  </button>
                  <button
                    className="thumbnail-carousel-desc"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  >
                    <img src={KuraPlongo} className="d-block w-100" />
                  </button>
                  <button
                    className="thumbnail-carousel-desc"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  >
                    <img src={KuraPlongo} className="d-block w-100" />
                  </button>
                  <button
                    className="thumbnail-carousel-desc"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="3"
                  >
                    <img src={KuraPlongo} className="d-block w-100" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="desc-kanan px-3 ">
              <div className="py-2 container">
                <p className="text-item-name-desc">{itemById.nama_item}</p>
                <p className="text-item-price-desc">
                  {formatUang(itemById.harga_item).replace(/\,00/g, "")}
                </p>
                <div className="d-flex" style={{ height: "30px" }}>
                  <p className="text-item-stok">Stok :</p>
                  <p className="px-1 text-item-stok">{itemById.stok_item}</p>
                </div>
              </div>

              <hr />
              <div className="desc-item ">
                <p className="text-desc-item-desc">{itemById.deskripsi_item}</p>
              </div>

              <hr />
              <div className="row desc-item-toko ">
                <div className="col-2  d-flex justify-content-end">
                  <div className="desc-foto-toko-item">
                    <img className="" src="" />
                  </div>
                </div>
                <div className="col p-1">
                  <p className="text-name-toko-item">{itemById.nama_toko}</p>
                  <p className="text-name-alamt-toko">{itemById.alamat_toko}</p>
                </div>
              </div>
              <hr />
              <div
                className="d-flex justify-content-end align-items-end"
                style={{ height: "50px" }}
              >
                <button className="but-cart" onClick={handleKeranjang}>
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
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
    </div>
  );
};

export default DescItem;
