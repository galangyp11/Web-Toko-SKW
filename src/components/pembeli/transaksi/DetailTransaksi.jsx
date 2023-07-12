import { useEffect, useState } from "react";
import axios from "axios";
import apiHost from "../../../constants/apiHost";
import { useNavigate } from "react-router-dom";

const DetailTransaksi = ({ data, index }) => {
  // const [dataDikirimDetail, setDataDikirimDetail] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [isSelesai, setIsSelesai] = useState(false);
  const [dataInput, setDataInput] = useState({
    status_transaksi: "Pesanan selesai",
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getNotif = async () => {
  //     const response = await axios.get(
  //       `${apiHost}transaksi/pembeli/${data.id_pesananku}`
  //     );
  //     setDataDikirimDetail(response.data);
  //     console.log(response.data);
  //   };
  //   getNotif();
  // }, []);

  useEffect(() => {
    if (data.status_transaksi === "Pesanan sedang dikirim") {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [isSelesai]);

  const handleTerima = async () => {
    await axios.put(
      `${apiHost}transaksi-penjual/${data.id_transaksi}`,
      dataInput
    );
    window.location.reload();
    setIsSelesai(true);
  };

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="item-transaksi-pembeli my-3" key={data.id_transaksi}>
      {/* <div
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
              Item ({dataDikirimDetail.length ? dataDikirimDetail.length : 1}) :
            </p>
          </div>
          <div className="col">
            {dataDikirimDetail.map((item, index) => {
              return (
                <p
                  className="text-nama-item-transaksi"
                  style={{ margin: "0" }}
                  key={index}
                >
                  - {item.nama_item}
                </p>
              );
            })}
          </div>
          <div className="col-2 garis-vertical-kiri">
            <p className="text-total-item-transaksi d-flex align-items-center">
              Total Harga : Rp {dataDikirimDetail[0]?.total_harga_transaksi}
            </p>
          </div>
          <div className="col-3 garis-vertical-kiri">
            <p className="text-total-item-transaksi d-flex align-items-center">
              Status Pesanan : {dataDikirimDetail[0]?.status_transaksi}
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
      </div> */}
      {!isDetail ? (
        <div className="item-transaksi-pembeli-detail ">
          <div className="d-flex justify-content-center list-item-transaksi-pembeli-detail">
            <div
              className="row pt-3"
              style={{ height: "100%", width: "100%" }}
              key={index}
            >
              <div className="col-1">
                <p className="no-list-item">{index + 1}</p>
              </div>
              <div
                className="col-2 d-flex align-items-start justify-content-start"
                style={{ height: "100%" }}
              >
                <div
                  className="bg-sub-gambar d-flex justify-content-center align-items-center "
                  style={{ marginBottom: "1em" }}
                >
                  <img
                    src={`${apiHost}${data?.gambar?.[0]}`}
                    className="gambar-item-desc"
                  />
                </div>
              </div>

              <div className="col-5 garis-vertical-kiri">
                <p className="text-nama-item-detail">{data.nama_item}</p>
                <div className="row">
                  <div className="col">
                    <p className="text-harga-item-detail">
                      {formatUang(data.harga_item).replace(/\,00/g, "")}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <p>Varian</p>
                  </div>
                  <div className="col-1">
                    <p>:</p>
                  </div>
                  <div className="col">
                    <p>
                      {data.ukuran}, {data.warna}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <p>Jumlah</p>
                  </div>
                  <div className="col-1">
                    <p>:</p>
                  </div>
                  <div className="col">
                    <p>{data.jumlah_beli}</p>
                  </div>
                </div>
              </div>
              <div className="col-3 garis-vertical-kiri">
                <p className="text-nama-toko-item-detail">{data.nama_toko}</p>
              </div>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="d-flex justify-content-center align-items-center">
            <div className="row" style={{ width: "100%", height: "3em" }}>
              <div className="col-2">
                <p className="text-item-status-detail">{data.waktu_pesan}</p>
              </div>
              <div className="col garis-vertical-kiri">
                {isSelesai ? (
                  <p className="text-item-pesanan-selesai">Pesanan selesai</p>
                ) : (
                  <div className="d-flex gap-2">
                    <p className="text-item-status-detail">Status Pesanan :</p>
                    <p className="text-status-item-detail">
                      {data.status_transaksi}
                    </p>
                  </div>
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
