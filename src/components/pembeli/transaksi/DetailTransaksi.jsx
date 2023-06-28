import { BsFillCaretRightFill } from "react-icons/bs";
import { useState } from "react";

const DetailTransaksi = ({data, index}) => {

    const [isDetail, setIsDetail] = useState(false);
    return ( 
        <div className="item-transaksi-pembeli my-2" key={data.id_transaksi} >
          <div className="item-transaksi-pembeli-atas d-flex justify-content-center" onClick={()=> setIsDetail(!isDetail)}>
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
          <div className="item-transaksi-pembeli-detail d-flex justify-content-center" key={index}>
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
     );
}
 
export default DetailTransaksi;