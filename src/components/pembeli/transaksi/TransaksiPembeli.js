import NavbarTransaksi from "./NavbarTransaksi";
import { BsFillCaretRightFill } from "react-icons/bs";
import './transaksipembeli.css'
import apiHost from "../../../constants/apiHost";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const TransaksiPembeli = () => {
  const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const id = Cookies.get("id");

  useEffect(() => {
    const getNotif = async () => {
      const response = await axios.get(`${apiHost}transaksi/pembeli/${id}`);
      setDataKonfirmasi(response.data);
      console.log(response.data);
    };
    getNotif();
  }, []);

  const handleDetail = (e, id) => {
    e.preventDefault()

    // dataKonfirmasi.forEach((data) => {
    //   if(data.id_transaksi =  id ){
    //     setIsDetail(!isDetail)
    //   } else {
    //     setIsDetail(false)
    //   }
    // })

    setIsDetail(!isDetail)
  }

  console.log(dataKonfirmasi);

  return (
    <div className="transaksi-pembeli">
      <div className="sticky-top">
        <NavbarTransaksi />
      </div>

      <div className="profilepembeli-con container py-5">
        {dataKonfirmasi?.map((data, index) => {
          return(
        <div className="item-transaksi-pembeli my-2" key={data.id_transaksi} >
          <div className="item-transaksi-pembeli-atas d-flex justify-content-center" onClick={(e)=> handleDetail(e, data.id_transaksi)}>
            <div className="row  d-flex align-items-center" style={{width:"100%"}}>
              <div className="col-1 garis-vertical-kanan">
                <p className="text-no-item-transaksi d-flex align-items-center justify-content-center">{index +1}</p>
              </div>
              <div className="col-1 d-flex align-items-center" style={{height:'100%'}}>
                <div className="bg-img-transaksi-pembeli d-flex align-items-center">

                </div>
              </div>
              <div className="col garis-vertical-kiri">
                <p className="text-nama-item-transaksi">Item ({data.length}) :</p>
              </div>
              <div className="col-2 garis-vertical-kiri">
                <p className="text-total-item-transaksi d-flex align-items-center">Total Harga : Rp {data.total_harga_transaksi}</p>
              </div>
              <div className="col-3 garis-vertical-kiri">
                <p className="text-total-item-transaksi d-flex align-items-center">Status Pesanan : {data.status_transaksi}</p>
              </div>
              <div className="col-1 garis-vertical-kiri">
                <div className="arrow-transaksi d-flex align-items-center justify-content-center">
                  <BsFillCaretRightFill size="20px" color='black' className={!isDetail ? "arrow-detail" : "arrow-detail-active"}/>
                </div>
              </div>
            </div>
          </div>
          {isDetail ? 
          <div className="item-transaksi-pembeli-detail d-flex justify-content-center">
            <div className="row pt-3" style={{height:"100%" ,width:"100%"}}>
              <div className="col-3 d-flex align-items-center justify-content-center" style={{height:'100%'}}>
                <div className="bg-img-transaksi-pembeli-detail">

                </div>
              </div>

              <div className="col garis-vertical-kiri">
                  <p className="text-item-detail">{data.nama_item}</p>
              </div>
              <div className="col-3 garis-vertical-kiri">
                <p className="text-item-detail">{data.nama_toko}</p>
              </div>

              <hr />
              <div className="row">
                <div className="col-2">
                  <p className="text-item-status-detail">Waktu : {data.waktu_pesan}</p>
                </div>
                <div className="col garis-vertical-kiri">
                  <p className="text-item-status-detail">Status Pesanan : {data.status_transaksi}</p>
                </div>
                <div className="col-3" style={{height:"100%"}}>
                  <div className="d-flex align-items-center" >
                    <button className="but-bermasalah-transaksi mx-1">Bermasalah?</button>
                    <button className="but-terima-transaksi mx-1">Terima</button>
                  </div>
                </div>
                </div>
            </div>
          </div>
                : <></>}
        </div>  
         )
        })}
      </div>
    </div>
  );
};

export default TransaksiPembeli;
