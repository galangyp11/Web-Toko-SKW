import "./category.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {
  const [datum, setDatum] = useState([]);

  useEffect(() => {
    const dataDB = async () => {
      const response = await axios.get(`http://localhost:3311/kategori`);
      setDatum(response.data);
      // console.log(response)
    };
    dataDB();
  }, []);

  return (
    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
      <div className="category row d-flex justify-content-center align-items-center">
        <p className="text-category px-4 pt-2">Kategori</p>
        {datum?.map((kategori) => {
          const foto = btoa(
            String.fromCharCode(...new Uint8Array(kategori.foto_kategori.data))
          );
          return (
            <div className="item-recomend mx-1 mb-5" key={kategori.id_kategori}>
              <Link
                to={`/kategori/${kategori.id_kategori}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="row">
                  <div className="recomend-thumbnail ">
                    <img
                      className="img-thumbnail"
                      src={`data:image/png;base64,${foto}`}
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <p className="text-thumbnail text-center">
                    {kategori.nama_kategori}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
