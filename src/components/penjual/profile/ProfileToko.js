import "./profiletoko.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import EditProfileToko from "./EditProfileToko";
import apiHost from "../../../constants/apiHost";

const ProfileToko = () => {
  const [penjualById, setPenjualById] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [foto, setFoto] = useState();
  const id = Cookies.get("id");

  useEffect(() => {
    const getItemById = async () => {
      const response = await axios.get(`${apiHost}penjual/${id}`);
      setPenjualById(response.data);
    };
    getItemById();
  }, []);

  useEffect(() => {
    try {
      setFoto(
        btoa(
          String.fromCharCode(...new Uint8Array(penjualById?.logo_toko?.data))
        )
      );
    } catch (error) {
      console.log("load image...");
    }
  }, [penjualById]);

  console.log(penjualById);
  return (
    <div className="container">
      <div className="row">
        <p className="text-title-halaman">Profile Toko</p>
      </div>
      {!isEdit ? (
        <div className="row profile-toko container d-flex justify-content-center">
          <div className="col-4 ">
            <div className="bg-foto-profile-penjual d-flex align-items-center justify-content-center">
              <img
                className="foto-profile-penjual"
                src={`data:image/png;base64,${foto}`}
                alt=""
              />
            </div>
          </div>

          <div className="col p-5 "></div>

          <div className="row ">
            <div className="col-2 ">
              <p className="text-profile-bio d-flex align-items-center">Toko</p>
            </div>

            <div className="col-1 ">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col ">
              <p className="text-profile-bio d-flex align-items-center">
                {penjualById?.nama_toko}
              </p>
            </div>
          </div>

          <hr />
          <div className="row ">
            <div className="col-2 ">
              <p className="text-profile-bio d-flex align-items-center">
                Email
              </p>
            </div>

            <div className="col-1 ">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col ">
              <p className="text-profile-bio d-flex align-items-center">
                {penjualById?.email_penjual}
              </p>
            </div>
          </div>
          <hr />

          <div className="row ">
            <div className="col-2 ">
              <p className="text-profile-bio d-flex align-items-center">
                Password
              </p>
            </div>

            <div className="col-1 ">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col ">
              <p className="text-profile-bio d-flex align-items-center">
                {penjualById?.password}
              </p>
            </div>
          </div>
          <hr />

          <div className="row ">
            <div className="col-2 ">
              <p className="text-profile-bio d-flex align-items-center">
                Alamat
              </p>
            </div>

            <div className="col-1 ">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col ">
              <p
                className="text-profile-bio d-flex align-items-center"
                style={{ height: "5em", resize: "none" }}
              >
                {penjualById?.alamat_toko}
              </p>
            </div>
          </div>
          <hr />

          <div className="row ">
            <div className="col-2 ">
              <p className="text-profile-bio d-flex align-items-center">
                Whatsapp
              </p>
            </div>

            <div className="col-1 ">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col ">
              <p className="text-profile-bio d-flex align-items-center">
                {penjualById?.whatsapp}
              </p>
            </div>
          </div>
          <hr />

          <div className="row ">
            <div className="col-2 ">
              <p className="text-profile-bio d-flex align-items-center">
                No. Rekening
              </p>
            </div>

            <div className="col-1 ">
              <p className="text-profile-bio d-flex justify-content-center align-items-center">
                :
              </p>
            </div>

            <div className="col ">
              <p className="text-profile-bio d-flex align-items-center">
                {penjualById?.no_rek_penjual}
              </p>
            </div>
          </div>
          <hr />

          <div className="row  d-flex justify-content-end align-items-end">
            <button
              className="btn btn-warning but-tolak-pesanan"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <EditProfileToko setIsEdit={setIsEdit} />
      )}
    </div>
  );
};

export default ProfileToko;
