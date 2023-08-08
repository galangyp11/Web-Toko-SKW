import { useEffect, useState } from "react";
import axios from "axios";
import apiHost from "../../../constants/apiHost";
import { useNavigate, Link } from "react-router-dom";

const DetailTransaksi = ({ data, index }) => {
  // const [dataDikirimDetail, setDataDikirimDetail] = useState([]);
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
    await axios.put(
      `${apiHost}transaksi-penjual/${data.id_transaksi}`,
      dataInput
    );
    // window.location.reload();
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
                <Link
                  to={`/toko/${data?.id_penjual}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="text-nama-toko-item-detail">{data.nama_toko}</p>
                </Link>
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
                    {data.status_transaksi !== "Pesanan sedang dikemas" ? (
                      <></>
                    ) : (
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
                    )}
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
