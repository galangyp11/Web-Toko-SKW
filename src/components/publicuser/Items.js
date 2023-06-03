import { useEffect, useState } from "react";
import "./items.css";
import { Link } from "react-router-dom";
import axios from "axios";
import apiHost from "../../constants/apiHost";
import { useSearch } from "../../context";

const Items = () => {
  const [datum, setDatum] = useState([]);
  const { state } = useSearch();

  useEffect(() => {
    const dataDB = async () => {
      const response = await axios.get(`${apiHost}item?search=${state.search}`);
      console.log("response", response);
      setDatum(response.data);
      // console.log(response)
    };
    dataDB();
  }, [state.search]);

  const formatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  console.log(datum);
  return (
    <div
      className="bg-items my-5 d-flex justify-content-center"
      style={{ width: "100%" }}
    >
      <div className="items p-4 d-flex justify-content-center">
        <div className="row gap-4 d-flex justify-content-center align-items-center row-cols-5">
          {datum.map((item) => {
            console.log("gambar", item.gambar);
            return (
              <div
                className="item m-2"
                key={item.id_item}
                style={{ cursor: "pointer", padding: "0px" }}
              >
                <Link
                  to={`/item/${item.id_item}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="img-thumbnail-item">
                    <img
                      className="item-image"
                      src={
                        "http://localhost:3311/1b84a10e4350de424f0620f56fd5c912.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="item-thumb-desc item-name mt-1 mx-2">
                    <p className="text-item-name">{item.nama_item}</p>
                  </div>
                  <br />
                  <div className="item-thumb-desc item-price mx-2">
                    <p className="text-item-price">
                      {formatUang(item.harga_item).replace(/,00/g, "")}
                    </p>
                  </div>
                  <div className="item-thumb-desc mx-2 ">
                    <p className="text-item-toko d-flex align-items-end pb-1">
                      {item.nama_toko}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Items;
