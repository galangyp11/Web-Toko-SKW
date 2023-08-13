import "./desccategory.css";
import imageKosong from "../image/image-kosong.png";
import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import axios from "axios";
import apiHost from "../../constants/apiHost";

const DescCategory = () => {
  // const dataUrl = useLocation();
  const [kategoriById, setKategoriById] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [namaKategori, setNamaKategori] = useState();
  const { id } = useParams();
  const [idKategori, setId] = useState(id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const kategoriDB = async () => {
      const response = await axios.get(`${apiHost}kategori`);
      if (response.status !== 200) {
        setIsLoading(true);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setKategori(response.data);
        }, 500);
      }
    };
    kategoriDB();

    // if (dataUrl.state === null) {
    setId(id);
    // } else {
    //   setId(dataUrl?.state?.kategori?.id_kategori);
    // }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getKategoriById = async () => {
      const response = await axios.get(`${apiHost}kategori/${idKategori}`);
      console.log(response);
      if (response.status !== 200) {
        setIsLoading(true);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setKategoriById(response.data);
        }, 500);
      }
    };
    getKategoriById();

    console.log("berubah datanya fus");
  }, [idKategori]);

  useEffect(() => {
    setNamaKategori(kategoriById[0]?.nama_kategori);
  }, [kategoriById]);

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  console.log({ kategoriById, idKategori, id });

  return (
    <div className="desc-category">
      <div className="breadcrumbs mt-2 d-flex">
        <Link className="breadcrumbs-not-active" to="/">
          Beranda
        </Link>
        <p className="breadcrumbs-active">
          <MdKeyboardArrowRight />
          Kategori
        </p>
      </div>
      <div className="desc-category-con container d-flex justify-content-center py-2">
        <div className="row mt-2" style={{ width: "100%" }}>
          <div className="desc-kategory-kiri col-2 py-2">
            <div className="row">
              <h3>Kategori</h3>
            </div>
            <div className="row">
              <ul className="list-menu-kategori">
                {!isLoading ? (
                  <div>
                    {kategori?.map((kategori) => {
                      return (
                        <Link
                          key={kategori?.id_kategori}
                          to={`/kategori/${kategori?.id_kategori}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <li
                            className="list-kategori d-flex align-items-center"
                            onClick={() => {
                              setId(kategori?.id_kategori);
                            }}
                          >
                            {kategori?.nama_kategori}
                          </li>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <Loading />
                )}
              </ul>
            </div>
          </div>
          <div className="desc-kategory-kanan col py-2">
            <div className="row my-1">
              <h3>{namaKategori}</h3>
            </div>

            <div className="items-kategori p-4">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="row gap-4 d-flex justify-content-center align-items-center row-cols-5">
                  {kategoriById.length ? (
                    kategoriById?.map((item) => {
                      return (
                        <div
                          className="item m-3"
                          key={item?.id_item}
                          style={{ cursor: "pointer", padding: "0px" }}
                        >
                          <Link
                            to={`/item/${item?.id_item}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <div className="img-thumbnail-item ">
                              <img
                                className="item-image"
                                src={
                                  item?.gambar?.length
                                    ? `${apiHost}${item?.gambar}`
                                    : imageKosong
                                }
                                alt=""
                              />
                            </div>
                            <div className="item-name py-1 px-2">
                              <p>{item?.nama_item}</p>
                            </div>
                            <div className="item-price px-2">
                              <h5>
                                {formatUang(item?.harga_item).replace(
                                  /\,00/g,
                                  ""
                                )}
                              </h5>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-item-tidak-ada">item tidak ada</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescCategory;
