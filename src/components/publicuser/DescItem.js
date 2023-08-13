import "./descitem.css";
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import ReactWhatsapp from "react-whatsapp";
import axios from "axios";
import Cookies from "js-cookie";

import apiHost from "../../constants/apiHost";
import AlertHijau from "../Alert/AlertHijau";
import AlertMerah from "../Alert/AlertMerah";
import Loading from "../Loading";

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
    ukuran: "-",
    warna: "-",
    total_harga: "",
    gambar: [],
  });
  const [ukuranItem, setUkuranItem] = useState([]);
  const [gambarItem, setGambarItem] = useState("");
  const [isUkuran, setIsUkuran] = useState(false);
  const [warnaItem, setWarnaItem] = useState([]);
  const [isWarna, setIsWarna] = useState(false);
  const [noWa, setNoWa] = useState();
  const [messageWa, setMessageWa] = useState("");
  const [isAlertHijau, setIsAlertHijau] = useState(false);
  const [isAlertMerah, setIsAlertMerah] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getItemById = async () => {
      const response = await axios.get(`${apiHost}item/${id}`);
      if (response.status !== 200) {
        setIsLoading(true);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setItemById(response.data);
        }, 500);
      }
    };
    getItemById();

    const getUkuranItem = async () => {
      const response = await axios.get(`${apiHost}item-ukuran/${id}`);
      setUkuranItem(response.data);
    };
    getUkuranItem();

    const getWarnaItem = async () => {
      const response = await axios.get(`${apiHost}item-warna/${id}`);
      setWarnaItem(response.data);
    };
    getWarnaItem();

    window.scrollTo(0, 0);
    setDataItem((data) => ({ ...data, id_pembeli: id_pembeli, id_item: id }));

    const getKeranjang = async () => {
      const response = await axios.get(`${apiHost}keranjang/${id_pembeli}`);
      setCekItemKeranjang(response.data);
    };

    if (id_pembeli !== undefined) {
      getKeranjang();
    }
  }, [isAlertHijau]);

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
    } else if (ukuranItem.length !== 0 && dataItem.ukuran === "-") {
      setIsAlertMerah(true);
      setTextAlert("Silahkan pilih ukuran");
    } else if (warnaItem.length !== 0 && dataItem.warna === "-") {
      setIsAlertMerah(true);
      setTextAlert("Silahkan pilih warna");
    } else {
      try {
        await axios.post(`${apiHost}keranjang`, dataItem);
        setIsAlertHijau(true);
        setTextAlert("Item dimasukkan ke keranjang");
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

    try {
      setFoto(
        btoa(String.fromCharCode(...new Uint8Array(itemById?.logo_toko?.data)))
      );
    } catch (error) {
      console.log("load image...");
    }

    const nowa = itemById.whatsapp;
    setNoWa(`+62 ${nowa}`);
    setMessageWa(
      `Halo ${itemById.nama_toko}, Apakah ${itemById.nama_item} tersedia?`
    );
    setGambarItem(`${apiHost}${itemById?.gambar?.[0]?.src}`);
  }, [itemById]);

  useEffect(() => {
    if (ukuranItem.length === 0) {
      setIsUkuran(false);
    } else setIsUkuran(true);
  }, [ukuranItem]);

  useEffect(() => {
    if (warnaItem.length === 0) {
      setIsWarna(false);
    } else setIsWarna(true);
  }, [warnaItem]);

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const location = useLocation();

  console.log({
    // ukuranItem,
    // warnaItem,
    // dataItem,
    // isWarna,
    // isUkuran,
    // gambarItem,
    itemById,
    location,
    // messageWa
  });

  return (
    <div className="descitem">
      <div className="breadcrumbs mt-2 d-flex">
        <Link className="breadcrumbs-not-active" to="/">
          Beranda
        </Link>
        <Link
          className="breadcrumbs-not-active"
          to={`/kategori/${itemById.id_kategori}`}
        >
          <MdKeyboardArrowRight />
          Kategori
        </Link>
        <p className="breadcrumbs-active">
          <MdKeyboardArrowRight />
          Detail Produk
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="desc-item-con container ">
          <div className="row pt-2" style={{ overflow: "hidden" }}>
            <div className="col">
              <div
                className="row d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <div className="bg-gambar-desc d-flex justify-content-center align-items-center">
                  <img src={gambarItem} className="gambar-item-desc" />
                </div>
              </div>

              <div className="container-sub-gambar row d-flex justify-content-center my-2 gap-2">
                {itemById &&
                  itemById?.gambar?.map((i) => {
                    return (
                      <div
                        className="bg-sub-gambar d-flex justify-content-center align-items-center"
                        onClick={() => setGambarItem(`${apiHost}${i.src}`)}
                      >
                        <img
                          src={`${apiHost}${i.src}`}
                          className="gambar-item-desc"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col ">
              <div className="desc-kanan px-3 ">
                <div className="py-2 container">
                  <p className="text-item-name-desc">{itemById?.nama_item}</p>
                  <p className="text-item-price-desc">
                    {formatUang(itemById?.harga_item).replace(/\,00/g, "")}
                  </p>
                  <div className="d-flex" style={{ height: "30px" }}>
                    <p className="text-item-stok">Stok :</p>
                    <p className="px-1 text-item-stok">{itemById?.stok_item}</p>
                  </div>
                </div>

                <hr />
                <div className="desc-item ">
                  <p className="text-desc-item-desc">
                    {itemById?.deskripsi_item}
                  </p>
                </div>

                <hr />
                <div className="row desc-item-toko">
                  <div className="col-2 d-flex justify-content-end">
                    <div className="bg-desc-foto-toko-item d-flex align-items-center justify-content-center">
                      <img
                        className="desc-foto-toko-item"
                        src={`data:image/png;base64,${foto}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col p-1">
                    <Link
                      to={`/toko/${itemById?.id_penjual}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p className="text-name-toko-item px-2">
                        {itemById?.nama_toko}
                      </p>
                    </Link>
                    {/* <p className="text-name-alamt-toko px-2 text-break">
                      {itemById?.alamat_toko}
                    </p> */}
                  </div>
                  <div className="col d-flex  align-items-center justify-content-end">
                    <ReactWhatsapp
                      number={`${noWa}`}
                      message={messageWa}
                      style={{ border: "none", backgroundColor: "trasnparent" }}
                    >
                      <button className="but-chat-penjual d-flex align-items-center justify-content-center gap-2">
                        <IoLogoWhatsapp color="white" size="20px" />
                        Chat penjual
                      </button>
                    </ReactWhatsapp>
                  </div>
                </div>
                <hr />
                <div className="row pilihan-desc-item">
                  {isUkuran ? (
                    <div className="col">
                      {ukuranItem?.map((data) => {
                        return (
                          <div
                            key={data.id_ukuran}
                            className="ukuran-item-input"
                          >
                            <input
                              type="radio"
                              name="ukuran"
                              id={data?.id_ukuran}
                              value={data?.nama_ukuran}
                              onChange={handleInputUkuran}
                            />
                            <label htmlFor="ukuran" className="px-2">
                              {data?.nama_ukuran}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}

                  {isWarna ? (
                    <div className="col">
                      {warnaItem?.map((data) => {
                        return (
                          <div
                            key={data?.id_warna}
                            className="col d-flex gap-2"
                          >
                            <input
                              type="radio"
                              name="warna"
                              value={data?.nama_warna}
                              onChange={handleInputWarna}
                            />
                            <label htmlFor="warna">{data?.nama_warna}</label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
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
      )}
    </div>
  );
};

export default DescItem;
