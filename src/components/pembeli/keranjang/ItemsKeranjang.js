import "./itemskeranjang.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import apiHost from "../../../constants/apiHost";

const ItemsKeranjang = ({ item, datum, setDatum, setDataInput, dataDB }) => {
  const refJumlah = useRef(1);
  const [disable, setDisable] = useState(true);

  // useState(()=>{
  //   if(item.jumlah === 1){
  //     setDisable(true)
  //   } else {
  //     setDisable(false)
  //   }
  // },[disable])

  const handleDelete = async (e, id) => {
    e.preventDefault();

    await axios.delete(`${apiHost}keranjang/${id}`);
    const dataFillter = datum.filter((item) => item.id_keranjang !== id);
    setDatum(dataFillter);
  };

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleTambah = (ijumlah, ikeranjang, ihargaitem, e) => {
    e.preventDefault();

    setDisable(false);
    setDataInput((data) => ({
      ...data,
      jumlah: +ijumlah + 1,
      id_keranjang: ikeranjang,
      total_harga: (+ijumlah + 1) * ihargaitem,
    }));

    dataDB();
  };

  const handleKurang = (ijumlah, ikeranjang, ihargaitem, e) => {
    e.preventDefault();

    if (item.jumlah === 2) {
      setDisable(true);
    } else setDisable(false);

    setDataInput((data) => ({
      ...data,
      jumlah: +ijumlah - 1,
      id_keranjang: ikeranjang,
      total_harga: (+ijumlah - 1) * ihargaitem,
    }));

    dataDB();
  };

  console.log({ datum });

  // const foto = btoa(String.fromCharCode(...new Uint8Array(item.foto_item.data)))
  return (
    <div className="items-keranjang my-3" key={item.id_keranjang}>
      <div
        className="row d-flex justify-content-center align-items-center px-3"
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="col-3 d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <Link
            to={`/item/${item.id_item}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="bg-sub-gambar d-flex justify-content-center align-items-center">
              <img
                className="gambar-item-desc"
                src={`${apiHost}${item?.gambar?.[0]}`}
              />
            </div>
          </Link>
        </div>
        <div className="col py-2" style={{ height: "100%" }}>
          <div className="row">
            <Link
              to={`/item/${item.id_item}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p className="text-nama-item-keranjang">{item.nama_item}</p>
            </Link>
          </div>
          <div className="row">
            <p>{formatUang(item.harga_item).replace(/\,00/g, "")}</p>
          </div>
          <div className="row">
            <div className="d-flex gap-2">
              <p>Varian : </p>
              <p>
                {item?.ukuran}, {item.warna}
              </p>
            </div>
          </div>
        </div>
        <div className="col-3 ">
          <div className="row d-flex justify-content-center">
            <div className="col-4 ">
              <p>Jumlah</p>
            </div>
          </div>
          <div className="row ">
            <div className="col  d-flex justify-content-center align-items-center">
              {!disable ? (
                <button
                  className="but-jumlah-keranjang "
                  onClick={(e) =>
                    handleKurang(
                      item.jumlah,
                      item.id_keranjang,
                      item.harga_item,
                      e
                    )
                  }
                  // disabled={disable}
                >
                  -
                </button>
              ) : (
                <button
                  className="but-jumlah-keranjang"
                  style={{ backgroundColor: "grey" }}
                  disabled
                >
                  -
                </button>
              )}
              <p className="text-jumlah-keranjang px-3 py-2">{item.jumlah}</p>
              <button
                className="but-jumlah-keranjang"
                onClick={(e) =>
                  handleTambah(
                    item.jumlah,
                    item.id_keranjang,
                    item.harga_item,
                    e
                  )
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div
          className="col-1  d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div onClick={(e) => handleDelete(e, item.id_keranjang)}>
            <MdOutlineCancel
              size="30px"
              color="grey"
              className="but-delete-keranjang"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemsKeranjang;
