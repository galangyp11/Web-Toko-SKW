import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const ProfileToko = () => {
  const [penjualById, setPenjualById] = useState({});
  const [foto, setFoto] = useState();
  const id = Cookies.get("id");

  useEffect(() => {
    const getItemById = async () => {
      const response = await axios.get(`http://localhost:3311/penjual/${id}`);
      setPenjualById(response.data);
      console.log(response.data);
    };
    getItemById();
  }, []);

  setTimeout(() => {
    try {
      setFoto(
        btoa(
          String.fromCharCode(...new Uint8Array(penjualById?.foto_profil?.data))
        )
      );
    } catch (error) {
      console.log("sabar bang fotonya lagi loading");
    }
  }, 100);

  return (
    <div className="profile-toko">
      <div className="row my-3 border">
        <div className="col-4 border d-flex justify-content-center">
          <div className="bg-foto-profile">
            <img
              className="foto-profile"
              src={`data:image/png;base64,${foto}`}
              alt=""
            />
          </div>
        </div>

        <div className="col p-5 border">
          <div className="row border">
            <div className="col-2 border">
              <p className="text-profile-bio d-flex align-items-center">Toko</p>
            </div>

            <div className="col-1 border">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col border">
              <p className="text-profile-bio d-flex align-items-center">
                {penjualById.nama_toko}
              </p>
            </div>
          </div>

          <div className="row border">
            <div className="col-2 border">
              <p className="text-profile-bio d-flex align-items-center">
                Email
              </p>
            </div>

            <div className="col-1 border">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col border">
              <p className="text-profile-bio d-flex align-items-center">
                {penjualById.email}
              </p>
            </div>
          </div>

          <div className="row border">
            <div className="col-2 border">
              <p className="text-profile-bio d-flex align-items-center">
                Password
              </p>
            </div>

            <div className="col-1 border">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col border">
              <p className="text-profile-bio d-flex align-items-center">
                {penjualById.password}
              </p>
            </div>
          </div>

          <div className="row border">
            <div className="col-2 border">
              <p className="text-profile-bio d-flex align-items-center">
                Alamat
              </p>
            </div>

            <div className="col-1 border">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col border">
              <p className="text-profile-bio d-flex align-items-center">
                {penjualById.alamat}
              </p>
            </div>
          </div>

          <div className="row border d-flex justify-content-end align-items-end">
            <div className="but-simpan-profile ">
              <p className="text-simpan-profile d-flex justify-content-center align-items-center">
                Simpan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileToko;
