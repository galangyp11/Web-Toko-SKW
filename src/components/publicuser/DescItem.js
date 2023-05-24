import "./descitem.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import apiHost from "../../constants/apiHost";

import KuraPlongo from "../image/kuraplongo.jpg";

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
  });

  useEffect(() => {
    const getItemById = async () => {
      const response = await axios.get(`${apiHost}/item/${id}`);
      setItemById(response.data);
    };
    getItemById();

    const getKeranjang = async () => {
      const response = await axios.get(`${apiHost}/keranjang/${id_pembeli}`);
      setCekItemKeranjang(response.data);
    };
    getKeranjang();

    window.scrollTo(0, 0);
    setDataItem((data) => ({ ...data, id_pembeli: id_pembeli, id_item: id }));
  }, []);

  const handleKeranjang = async (e) => {
    e.preventDefault();

    if (id_pembeli === undefined) {
      alert("Login dulu bre");
    } else if (idItemKeranjang === itemById.id_item) {
      alert("Item sudah ada di Keranjang !");
    } else {
      try {
        await axios.post(`http://localhost:3311/keranjang`, dataItem);
        alert("Item Masuk ke keranjang :)");
        window.location.reload();
        console.log("bisa kog");
      } catch (error) {
        console.log("eror bang gabisa input");
      }
    }
  };

    cekItemKeranjang.map((data) => {
      setIdItemKeranjang(data.id_item);
    });
  }, [handleKeranjang]);

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(()=>{
        window.scrollTo(0, 0);
        setDataItem((data) => ({...data,
            id_pembeli : id_pembeli,
            id_item : id
        }))                
    }, []);

    useEffect(() => {
        const getKeranjang = async () => {
            const response = await axios.get(`${apiHost}keranjang/${id_pembeli}`);
            setCekItemKeranjang(response.data)
        }
        getKeranjang()
    },[id_pembeli])

    const handleKeranjang = async (e) => {
        e.preventDefault()
        
            if(id_pembeli === undefined){
                alert('Login dulu bre')
            } else if(idItemKeranjang === itemById.id_item){   
                alert('Item sudah ada di Keranjang !')
            } else {
                try {
                    await axios.post(`http://localhost:3311/keranjang`, dataItem);
                    alert('Item Masuk ke keranjang :)');
                    window.location.reload()
                    console.log('bisa kog')
                } catch (error) {
                    console.log('eror bang gabisa input')
                }
            }        
  const handleKeranjang = async (e) => {
    e.preventDefault();

    if (id_pembeli === undefined) {
      alert("Login dulu bre");
    } else if (idItemKeranjang === itemById.id_item) {
      alert("Item sudah ada di Keranjang !");
    } else {
      try {
        await axios.post(`http://localhost:3311/keranjang`, dataItem);
        alert("Item Masuk ke keranjang :)");
        window.location.reload();
        console.log("bisa kog");
      } catch (error) {
        console.log("eror bang gabisa input");
      }
    }
  };

    useEffect(()=>{
        cekItemKeranjang.map((data)=>{
            setIdItemKeranjang(data.id_item)
        })
    },[id_pembeli])
  useEffect(() => {
    cekItemKeranjang.map((data) => {
      setIdItemKeranjang(data.id_item);
    });
  }, [handleKeranjang]);

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

    // setTimeout(()=>{
    //     try {
    //         setFoto(btoa(String.fromCharCode(...new Uint8Array(itemById.foto_item.data))))
    //     } catch (error) {
    //         console.log('sabar bang fotonya lagi loading')
    //     }
    // }, 100)    
    // console.log(idItemKeranjang)
    console.log(cekItemKeranjang)
    // console.log(itemById)
  // setTimeout(()=>{
  //     try {
  //         setFoto(btoa(String.fromCharCode(...new Uint8Array(itemById.foto_item.data))))
  //     } catch (error) {
  //         console.log('sabar bang fotonya lagi loading')
  //     }
  // }, 100)
  // console.log(idItemKeranjang)
  // console.log(cekItemKeranjang)
  console.log(itemById);

    return ( 
        <div className="descitem">
            <div className="desc-item-con container ">
                <div className="row pt-4" style={{ overflow:"hidden"}}>
                    <div className="col d-flex justify-content-center">
                        <div className="">
                     
                            <div id="carouselExampleIndicators" className="carousel slide" data-mdb-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={KuraPlongo} className="carousel-foto-item d-block"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={KuraPlongo} className="carousel-foto-item d-block"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={KuraPlongo} className="carousel-foto-item d-block"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={KuraPlongo} className="carousel-foto-item d-block"/>
                                    </div>
                                </div>
  return (
    <div className="descitem">
      <div className="desc-item-con container ">
        <div className="row pt-4" style={{ overflow: "hidden" }}>
          <div className="col d-flex justify-content-center">
            <div className="">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-mdb-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={KuraPlongo} class="d-block w-100" />
                  </div>
                  <div class="carousel-item">
                    <img src={KuraPlongo} class="d-block w-100" />
                  </div>
                  <div class="carousel-item">
                    <img src={KuraPlongo} class="d-block w-100" />
                  </div>
                  <div class="carousel-item">
                    <img src={KuraPlongo} class="d-block w-100" />
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-mdb-target="#carouselExampleIndicators"
                  data-mdb-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-mdb-target="#carouselExampleIndicators"
                  data-mdb-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>

                                <div className="carousel-indicators-desc d-flex justify-content-center">
                                    <button className='thumbnail-carousel-desc active' data-target="#carouselExampleIndicators" data-slide-to="0">
                                        <img src={KuraPlongo} className="d-block w-100"/>
                                    </button>
                                    <button className='thumbnail-carousel-desc' data-target="#carouselExampleIndicators" data-slide-to="1">
                                        <img src={KuraPlongo} className="d-block w-100"/>
                                    </button>
                                    <button className='thumbnail-carousel-desc' data-target="#carouselExampleIndicators" data-slide-to="2">
                                        <img src={KuraPlongo} className="d-block w-100"/>
                                    </button>
                                    <button className='thumbnail-carousel-desc' data-target="#carouselExampleIndicators" data-slide-to="3">
                                        <img src={KuraPlongo} className="d-block w-100"/>
                                    </button>
                                </div>
                            
                            </div>

                           
                        </div>
                    </div>
                <div class="carousel-indicators-desc d-flex justify-content-center">
                  <button
                    className="thumbnail-carousel-desc active"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                  >
                    <img src={KuraPlongo} class="d-block w-100" />
                  </button>
                  <button
                    className="thumbnail-carousel-desc"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  >
                    <img src={KuraPlongo} class="d-block w-100" />
                  </button>
                  <button
                    className="thumbnail-carousel-desc"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  >
                    <img src={KuraPlongo} class="d-block w-100" />
                  </button>
                  <button
                    className="thumbnail-carousel-desc"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="3"
                  >
                    <img src={KuraPlongo} class="d-block w-100" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col ">
            <div className="desc-kanan py-2 px-3 ">
              <div className="">
                <p className="text-item-name-desc">{itemById.nama_item}</p>
              </div>
              <div className="">
                <p className="text-item-price-desc">
                  {formatUang(itemById.harga_item).replace(/\,00/g, "")}
                </p>
              </div>

              <hr />
              <div className="desc-item ">
                <p className="text-desc-item-desc">{itemById.deskripsi_item}</p>
              </div>

              <hr />
              <div className="row desc-item-toko ">
                <div className="col-2  d-flex justify-content-end">
                  <div className="desc-foto-toko-item">
                    <img className="" src="" />
                  </div>
                </div>
                <div className="col ">
                  <p className="text-name-toko-item">{itemById.nama_toko}</p>
                </div>
              </div>
              <hr />

                            <div className="d-flex justify-content-end align-items-end" style={{height:"130px"}} >
                                <button className='but-cart' onClick={handleKeranjang}>Tambah ke Keranjang</button>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-mdb-target="#carouselExampleIndicators"
                  data-mdb-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-mdb-target="#carouselExampleIndicators"
                  data-mdb-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>

                <div class="carousel-indicators-desc d-flex justify-content-center">
                  <button
                    className="thumbnail-carousel-desc active"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                  >
                    <img src={KuraPlongo} class="d-block w-100" />
                  </button>
                  <button
                    className="thumbnail-carousel-desc"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  >
                    <img src={KuraPlongo} class="d-block w-100" />
                  </button>
                  <button
                    className="thumbnail-carousel-desc"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  >
                    <img src={KuraPlongo} class="d-block w-100" />
                  </button>
                  <button
                    className="thumbnail-carousel-desc"
                    data-target="#carouselExampleIndicators"
                    data-slide-to="3"
                  >
                    <img src={KuraPlongo} class="d-block w-100" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col ">
            <div className="desc-kanan py-2 px-3 ">
              <div className="">
                <p className="text-item-name-desc">{itemById.nama_item}</p>
              </div>
              <div className="">
                <p className="text-item-price-desc">
                  {formatUang(itemById.harga_item).replace(/\,00/g, "")}
                </p>
              </div>

              <hr />
              <div className="desc-item ">
                <p className="text-desc-item-desc">{itemById.deskripsi_item}</p>
              </div>

              <hr />
              <div className="row desc-item-toko ">
                <div className="col-2  d-flex justify-content-end">
                  <div className="desc-foto-toko-item">
                    <img className="" src="" />
                  </div>
                </div>
                <div className="col ">
                  <p className="text-name-toko-item">{itemById.nama_toko}</p>
                </div>
              </div>
              <hr />

              <div
                className="d-flex justify-content-end align-items-end"
                style={{ height: "130px" }}
              >
                <button className="but-cart" onClick={handleKeranjang}>
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescItem;
