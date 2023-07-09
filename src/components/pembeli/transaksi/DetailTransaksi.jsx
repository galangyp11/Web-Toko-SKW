import { BsFillCaretRightFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import apiHost from "../../../constants/apiHost";
import { useNavigate } from "react-router-dom";

const DetailTransaksi = ({ data, index }) => {
  const [isDetail, setIsDetail] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [isSelesai, setIsSelesai] = useState(false);
  const [dataInput, setDataInput] = useState({
    status_transaksi: "Pesanan selesai",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data.status_transaksi === "Pesanan sedang dikirim") {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [isSelesai]);

  const handleTerima = async () => {
    await axios.put(`${apiHost}transaksi/${data.id_transaksi}`, dataInput);
    window.location.reload();
    setIsSelesai(true);
  };

  console.log({ data });

  return (
    <div className="item-transaksi-pembeli my-2" key={data.id_transaksi}>
      <div
        className="item-transaksi-pembeli-atas d-flex justify-content-center"
        onClick={() => setIsDetail(!isDetail)}
      >
        <div
          className="row  d-flex align-items-center"
          style={{ width: "100%" }}
        >
          <div className="col-1 garis-vertical-kanan">
            <p className="text-no-item-transaksi d-flex align-items-center justify-content-center">
              {index + 1}
            </p>
          </div>
          <div className="col-1">
            <p className="text-nama-item-transaksi">
              Item ({data.length ? data.length : 1}) :
            </p>
          </div>
          <div className="col">
            <p className="text-nama-item-transaksi">- {data.nama_item}</p>
          </div>
          <div className="col-2 garis-vertical-kiri">
            <p className="text-total-item-transaksi d-flex align-items-center">
              Total Harga : Rp {data.total_harga_transaksi}
            </p>
          </div>
          <div className="col-3 garis-vertical-kiri">
            <p className="text-total-item-transaksi d-flex align-items-center">
              Status Pesanan : {data.status_transaksi}
            </p>
          </div>
          <div className="col-1 garis-vertical-kiri">
            <div className="arrow-transaksi d-flex align-items-center justify-content-center">
              <BsFillCaretRightFill
                size="20px"
                color="black"
                className={!isDetail ? "arrow-detail" : "arrow-detail-active"}
              />
            </div>
          </div>
        </div>
      </div>
      {isDetail ? (
        <div
          className="item-transaksi-pembeli-detail d-flex justify-content-center"
          key={index}
        >
          <div className="row pt-3" style={{ height: "100%", width: "100%" }}>
            <div
              className="col-3 d-flex align-items-center justify-content-center"
              style={{ height: "100%" }}
            >
              <div className="bg-sub-gambar d-flex justify-content-center align-items-center">
                <img
                  src={`${apiHost}${data?.gambar?.[0]}`}
                  className="gambar-item-desc"
                />
              </div>
            </div>

            <div className="col garis-vertical-kiri">
              <p className="text-item-detail">{data.nama_item}</p>
            </div>
            <div className="col-3 garis-vertical-kiri">
              <p className="text-item-detail">{data.nama_toko}</p>
            </div>

            <hr className="mt-4" />
            <div className="row">
              <div className="col-2">
                <p className="text-item-status-detail">
                  Waktu : {data.waktu_pesan}
                </p>
              </div>
              <div className="col garis-vertical-kiri">
                {isSelesai ? (
                  <p className="text-item-pesanan-selesai">Pesanan selesai</p>
                ) : (
                  <p className="text-item-status-detail">
                    Status Pesanan : {data.status_transaksi}
                  </p>
                )}
              </div>
              <div className="col-3" style={{ height: "100%" }}>
                {isSelesai ? (
                  <></>
                ) : (
                  <div className="d-flex align-items-center">
                    <button
                      className="but-bermasalah-transaksi mx-1"
                      onClick={() => {
                        navigate(`/pesanan-bermasalah/${data.id_transaksi}`, {
                          state: { data },
                        });
                      }}
                    >
                      Bermasalah?
                    </button>
                    {!isDisable ? (
                      <button
                        className="but-terima-transaksi"
                        onClick={handleTerima}
                      >
                        Terima
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DetailTransaksi;
