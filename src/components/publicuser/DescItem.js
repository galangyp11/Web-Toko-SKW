import "./descitem.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";

import apiHost from "../../constants/apiHost";
import AlertHijau from "../AlertHijau";
import AlertMerah from "../AlertMerah";
import KuraPlongo from "../image/kuraplongo.jpg";

const DescItem = () => {
  const [itemById, setItemById] = useState({});
  console.log("itemById", itemById);
  const [cekItemKeranjang, setCekItemKeranjang] = useState([]);
  const [idItemKeranjang, setIdItemKeranjang] = useState();
  const [foto, setFoto] = useState();
  const id_pembeli = Cookies.get("id");
  const { id } = useParams();
  const [dataItem, setDataItem] = useState({
    id_pembeli: "",
    id_item: "",
    jumlah: "1",
    ukuran: "",
    warna: "",
    total_harga: "",
    gambar: [],
  });
  const [ukuranitem, setUkuranItem] = useState([]);
  const [isUkuran, setIsUkuran] = useState(false);
  const [isWarna, setIsWarna] = useState(false);
  const [isAlertHijau, setIsAlertHijau] = useState(false);
  const [isAlertMerah, setIsAlertMerah] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  useEffect(() => {
    const getItemById = async () => {
      const response = await axios.get(`${apiHost}item/${id}`);
      setItemById(response.data);
    };
    getItemById();

    // const getUkuranItem = async () => {
    //   const response = await axios.get(`${apiHost}item-ukuran/${id}`);
    //   setUkuranItem(response.data);
    // };
    // getUkuranItem();

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

  const handleInputUkuran = (e) => {
    e.preventDefault();
    setDataItem((data) => ({ ...data, ukuran: e.target.value }));
  };

  const handleInputWarna = (e) => {
    e.preventDefault();
    setDataItem((data) => ({ ...data, warna: e.target.value }));
  };

  const handleKeranjang = async (e) => {
    e.preventDefault();

    if (id_pembeli === undefined) {
      setIsAlertMerah(true);
      setTextAlert("Silahkan Login dahulu");
    } else if (idItemKeranjang === itemById.id_item) {
      setIsAlertMerah(true);
      setTextAlert("Item sudah ada di keranjang");
    } else if (itemById.nama_ukuran !== null && dataItem.ukuran_item === "") {
      setIsAlertMerah(true);
      setTextAlert("Silahkan pilih ukuran");
      // } else if (itemById.warna_item !== null && dataItem.warna_item === "") {
      //   setIsAlertMerah(true)
      //   setTextAlert('Silahkan pilih varian warna')
    } else {
      try {
        await axios.post(`${apiHost}keranjang`, dataItem);
        setIsAlertHijau(true);
        setTextAlert("Item dimasukkan ke keranjang");
        window.location.reload();
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

    if (itemById.nama_ukuran === null) {
      setIsUkuran(false);
    } else setIsUkuran(true);

    if (itemById.warna_item === null || itemById.warna_item === "") {
      setIsWarna(false);
    } else {
      setIsWarna(true);
    }
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
  // console.log('ukuranItem',ukuranitem);
  // console.log('isWarna', isWarna)
  // console.log('isUkuran', isUkuran)

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
                      src={`${apiHost}${itemById?.gambar?.[0]}`}
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
                  {itemById &&
                    itemById?.gambar?.map((i) => {
                      return (
                        <button
                          className="thumbnail-carousel-desc active"
                          data-target="#carouselExampleIndicators"
                          data-slide-to="0"
                        >
                          <img
                            src={`${apiHost}${i}`}
                            className="d-block w-100"
                          />
                        </button>
                      );
                    })}
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
                <div className="col-2 d-flex justify-content-end">
                  <div className="desc-foto-toko-item">
                    <img className="" src="" />
                  </div>
                </div>
                <div className="col p-1">
                  <Link
                    to={`/toko/${itemById.id_penjual}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p className="text-name-toko-item px-2">
                      {itemById.nama_toko}
                    </p>
                  </Link>
                  <p className="text-name-alamt-toko px-2">
                    {itemById.alamat_toko}
                  </p>
                </div>
                <div className="col d-flex  align-items-center justify-content-end">
                  <button className="but-chat-penjual d-flex align-items-center justify-content-center gap-2">
                    <IoLogoWhatsapp color="white" size="20px" />
                    Chat penjual
                  </button>
                </div>
              </div>
              <hr />
              <div className="row pilihan-desc-item border">
                {isUkuran ? (
                  ukuranitem.map((data) => {
                    return (
                      <div key={data.id_ukuran} className="ukuran-item-input">
                        <input
                          type="checkbox"
                          name="ukuran"
                          id={data.id_ukuran}
                          value={data.nama_ukuran}
                          onChange={handleInputUkuran}
                        />
                        <label htmlFor="ukuran">{data.nama_ukuran}</label>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}

                {isWarna ? (
                  <div className="col d-flex gap-2">
                    <input
                      type="checkbox"
                      name="ukuran"
                      value={itemById.warna_item}
                      onChange={handleInputWarna}
                    />
                    <label htmlFor="ukuran">{itemById.warna_item}</label>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div
                className="d-flex justify-content-center align-items-end"
                style={{ height: "100px" }}
              >
                <button
                  className="but-cart d-flex align-items-center justify-content-center gap-2"
                  onClick={handleKeranjang}
                >
                  <BsFillCartFill color="white" size="20px" />
                  Tambah ke Keranjang
                </button>
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
    </div>
  );
};

export default DescItem;
