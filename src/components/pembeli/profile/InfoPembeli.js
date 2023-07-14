import "./infopembeli.css";
import fotoKosing from "../../image/pp-kosong.png";
import { BsArrowRepeat } from "react-icons/bs";

const InfoPembeli = ({
  pembeliById,
  foto,
  isEdit,
  setIsEdit,
  setIdPageEdit,
}) => {
  console.log({ pembeliById });
  // const foto = btoa(
  //     String.fromCharCode(...new Uint8Array(pembeliById.foto_profil))
  //   );
  return (
    <div className="info-pembeli row my-3">
      <div
        className="col-5 d-flex justify-content-center"
        style={{ height: "100%" }}
      >
        <div className="profile-card-kiri d-flex align-items-center">
          <div className="bg-foto-profile-pembeli p-3 d-flex align-items-center justify-content-center">
            <img
              className="foto-profile"
              src={
                pembeliById.foto_profil?.data.length === 0
                  ? fotoKosing
                  : `data:image/png;base64,${foto}`
              }
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="col p-0">
        <div className="profile-card-kanan px-3 d-flex align-items-center">
          <div className="row gap-2 container">
            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Username
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <p className="text-profile-bio-data d-flex align-items-center">
                  {pembeliById.username}
                </p>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Email
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <p className="text-profile-bio-data d-flex align-items-center">
                  {pembeliById.email}
                </p>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Password
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <p className="text-profile-bio-data d-flex align-items-center">
                  {pembeliById.password}
                </p>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Nomor Telepon
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <p className="text-profile-bio-data d-flex align-items-center">
                  {pembeliById.no_telp}
                </p>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-2">
                <p className="text-profile-bio d-flex align-items-center">
                  Alamat
                </p>
              </div>
              <div className="col-1">
                <p className="text-profile-bio d-flex justify-content-center align-items-center">
                  :
                </p>
              </div>
              <div className="col">
                <p className="text-profile-bio-alamat d-flex align-items-end">
                  {pembeliById.alamat}
                </p>
              </div>
            </div>
            <hr />

            <div className="row  d-flex justify-content-end align-items-end mx-2">
              <button
                className="btn btn-warning but-tolak-pesanan"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPembeli;
