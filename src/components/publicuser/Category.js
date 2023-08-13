import "./category.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import apiHost from "../../constants/apiHost";
import Loading from "../Loading";

const Category = () => {
  const [datum, setDatum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dataDB = async () => {
      const response = await axios.get(`${apiHost}kategori`);
      if (response.status !== 200) {
        setIsLoading(true);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setDatum(response.data);
        }, 500);
      }
    };
    dataDB();
  }, []);

  console.log({ datum });

  return (
    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="category row d-flex justify-content-center align-items-center">
          <p className="text-category px-4 pt-2">Kategori</p>
          {datum?.map((kategori) => {
            const foto = btoa(
              String.fromCharCode(
                ...new Uint8Array(kategori.foto_kategori.data)
              )
            );
            return (
              <div
                className="item-recomend mx-1 mb-5"
                key={kategori.id_kategori}
              >
                <div className="row">
                  <div
                    className="recomend-thumbnail"
                    onClick={() => {
                      navigate(`/kategori/${kategori.id_kategori}`, {
                        state: { kategori },
                      });
                    }}
                  >
                    <img
                      className="img-thumbnail"
                      src={`data:image/png;base64,${foto}`}
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <p
                    className="text-thumbnail text-center"
                    style={{ color: "black" }}
                  >
                    {kategori.nama_kategori}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;
