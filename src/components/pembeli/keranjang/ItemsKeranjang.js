import "./itemskeranjang.css";
import kura from "../../image/kuraplongo.jpg";
import axios from "axios";

import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiHost from "../../../constants/apiHost";

const ItemsKeranjang = ({ datum, setDatum, setDataInput, disable, dataDB}) => {

  const [isUkuran, setIsUkuran] = useState(false)

  useEffect(()=>{
    if(datum.ukuran === null){
      setIsUkuran(false)
    } else {
      setIsUkuran(true)
    }
  },[])

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      await axios.delete(`${apiHost}keranjang/${id}`);
      const dataFillter = datum.filter((item) => item.id_keranjang !== id);
      setDatum(dataFillter);
    } catch (error) {
      console.log(error);
    }
  };

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  
  const handleTambah = (ijumlah, ikeranjang, ihargaitem, e) => {
    e.preventDefault()
    
    setDataInput((data)=>({...data,
      jumlah : +ijumlah + 1,
      id_keranjang : ikeranjang,
      total_harga : (+ijumlah + 1) * ihargaitem
    }))

    dataDB()
  }

  const handleKurang = (ijumlah, ikeranjang, ihargaitem, e) => {
    e.preventDefault()
    
    setDataInput((data)=>({...data,
      jumlah : +ijumlah - 1,
      id_keranjang : ikeranjang,
      total_harga : (+ijumlah - 1) * ihargaitem
    }))

    dataDB()
  }

  return datum.map((item) => {
    // const foto = btoa(String.fromCharCode(...new Uint8Array(item.foto_item.data)))
    return (
      <div className="items-keranjang my-3" key={item.id_keranjang}>
        <div
          className="row d-flex justify-content-center align-items-center px-3"
          style={{ height: "100%", width: "100%" }}
        >
          <div
            className="col-3  d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <img
              className="img-items-keranjang"
              src={`data:image/png;base64,`}
            />
          </div>
          <div className="col  py-2" style={{ height: "100%" }}>
            <div className="row">
              <p className="text-nama-item-keranjang">{item.nama_item}</p>
            </div>
            <div className="row">
              <p>{formatUang(item.harga_item).replace(/\,00/g, "")}</p>
            </div>
            <div className="row">
              {isUkuran ? <div className="d-flex gap-2">
                <p>Ukuran : </p>
                <p>{item.ukuran}</p>
              </div> : <div></div>}
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
                <button
                  className="but-jumlah-keranjang "
                  onClick={(e)=> handleKurang(item.jumlah, item.id_keranjang, item.harga_item, e)}
                  disabled={disable}
                >
                  -
                </button>
                <p className="text-jumlah-keranjang px-3 py-2" >
                  {item.jumlah}
                </p>
                <button
                  className="but-jumlah-keranjang"
                  onClick={(e)=> handleTambah(item.jumlah, item.id_keranjang, item.harga_item, e)}
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
            <div onClick={(e) => handleDelete(item.id_keranjang, e)}>
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
  });
};
export default ItemsKeranjang;
