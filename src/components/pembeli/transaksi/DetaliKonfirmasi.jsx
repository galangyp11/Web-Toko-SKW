import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import apiHost from "../../../constants/apiHost";

const DetailKonfirmasi = ({ data, index }) => {
  const [isDetail, setIsDetail] = useState(false);
  const [dataKonfirmasiDetail, setDataKonfirmasiDetail] = useState([]);

  useEffect(() => {
    const getDataKonfirmasi = async () => {
      const response = await axios.get(
        `${apiHost}konfirmasi-detail/${data.id_konfirmasi}`
      );
      setDataKonfirmasiDetail(response.data);
    };
    getDataKonfirmasi();
  }, [data]);

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  console.log({ dataKonfirmasiDetail });
  return (
    <div className="detail-konfirmasi">
      <div className="item-transaksi-pembeli my-3" key={data.id_transaksi}>
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
            <div className="col-1 d-flex gap-2">
              <p className="text-nama-item-transaksi pt-3">Item :</p>

              <p className="text-nama-item-transaksi pt-3">
                {dataKonfirmasiDetail?.length
                  ? dataKonfirmasiDetail?.length
                  : 1}
              </p>
            </div>

            <div className="col garis-vertical-kiri">
              <p className="text-total-item-transaksi d-flex align-items-center">
                Total Harga : Rp
                {dataKonfirmasiDetail?.[0]?.total_harga_transaksi}
              </p>
            </div>
            <div className="col garis-vertical-kiri">
              <p className="text-total-item-transaksi d-flex align-items-center">
                Status Pembayaran : {data.status_pembayaran}
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
          <div className="item-transaksi-pembeli-konfirmasi">
            {dataKonfirmasiDetail.map((data, index) => {
              return (
                <div className=" " key={index}>
                  <div className="d-flex justify-content-center list-item-transaksi-pembeli-detail">
                    <div
                      className="row pt-3"
                      style={{ height: "100%", width: "100%", height: "3em" }}
                    >
                      <div className="col-1">
                        <p className="no-list-item">{index + 1}</p>
                      </div>

                      <div className="col-2 garis-vertical-kiri">
                        <p className="text-nama-item-konfirmasi">
                          {data.nama_item}
                        </p>
                      </div>

                      <div className="col-2">
                        <p className="text-harga-item-konfirmasi">
                          {formatUang(data.harga_item).replace(/\,00/g, "")}
                        </p>
                      </div>

                      <div className="col-2">
                        <p>
                          {data.ukuran}, {data.warna}
                        </p>
                      </div>

                      <div className="col-2 d-flex gap-2">
                        <p>Jumlah :</p>
                        <p>{data.jumlah_beli}</p>
                      </div>

                      <div className="col-1 garis-vertical-kiri">
                        <p className="text-nama-toko-item-detail">
                          {data.nama_toko}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <hr />
            <div
              className="d-flex justify-content-center align-items-center "
              style={{ backgroundColor: "#f7f7f7" }}
            >
              <div className="row" style={{ width: "100%", height: "3em" }}>
                <div className="col-2">
                  <p className="text-item-status-detail">{data.waktu_pesan}</p>
                </div>
                <div className="col garis-vertical-kiri">
                  <div className="d-flex gap-2">
                    <p className="text-item-status-detail">Status Pesanan :</p>
                    <p className="text-status-item-detail">
                      {data.status_pembayaran}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DetailKonfirmasi;
