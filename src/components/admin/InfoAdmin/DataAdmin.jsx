import { useEffect, useState } from "react";
import axios from "axios";
import apiHost from "../../../constants/apiHost";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import AlertHijau from "../../Alert/AlertHijau";
import AlertMerah from "../../Alert/AlertMerah";
import Cookies from "js-cookie";

const DataAdmin = () => {
  const [dataAdmin, setDataAdmin] = useState([]);
  const id = Cookies.get("id");
  const [isDisable, setisDisable] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [typePassword, setTypePassword] = useState("password");
  const [isHiddenPass, setIsHiddenPass] = useState(false);
  const [dataInput, setDataInput] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isAlertHijau, setIsAlertHijau] = useState(false);
  const [isAlertMerah, setIsAlertMerah] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  useEffect(() => {
    const getAdmin = async () => {
      const response = await axios.get(`${apiHost}admin/${id}`);
      setDataAdmin(response.data);
    };
    getAdmin();
  }, [isEdit]);

  useEffect(() => {
    setDataInput((data) => ({
      ...data,
      email: dataAdmin.email,
      username: dataAdmin.username,
      password: dataAdmin.password,
    }));
  }, [dataAdmin]);

  const handleHiddenPass = (e) => {
    e.preventDefault();
    setIsHiddenPass(false);
    setTypePassword("password");
  };

  const handleShowPass = (e) => {
    e.preventDefault();
    setIsHiddenPass(true);
    setTypePassword("text");
  };

  const handleEdit = (e) => {
    e.preventDefault();

    setIsEdit(true);
    setisDisable(false);
  };

  const handleSimpan = async (e) => {
    e.preventDefault();

    if (dataInput.email === "") {
      setIsAlertMerah(true);
      setTextAlert("Email tidak boleh kosong!");
    } else if (dataInput.username === "") {
      setIsAlertMerah(true);
      setTextAlert("Username tidak boleh kosong!");
    } else if (dataInput.password === "") {
      setIsAlertMerah(true);
      setTextAlert("Password tidak boleh kosong!");
    } else {
      await axios.put(`${apiHost}admin/${id}`, dataInput);
      setIsAlertHijau(true);
      setTextAlert("Data berhasil diubah");
      setIsEdit(false);
      setisDisable(true);
    }
  };

  const handleBatal = (e) => {
    e.preventDefault();

    setIsEdit(false);
    setisDisable(true);
  };

  const handleInput = (e) => {
    e.preventDefault();

    setDataInput((data) => ({
      ...data,
      [e.target.id]: e.target.value,
    }));
  };

  console.log({
    dataAdmin,
    dataInput,
  });
  return (
    <div className="data-admin">
      <div className="bg-info-data-admin my-3 p-3">
        <p className="text-judul-data-admin">Data Admin</p>
        <hr />

        <div className="row">
          <div className="bg-data-info row">
            <div className="col-4">
              <p className="text-data-info">Email</p>
            </div>
            <div className="col-1 p-0">
              <p>:</p>
            </div>
            <div className="col-4">
              <input
                type="text"
                id="email"
                className="input-text"
                value={!isEdit ? dataAdmin.email : dataInput.email}
                disabled={isDisable}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="bg-data-info row">
            <div className="col-4">
              <p className="text-data-info">Username</p>
            </div>
            <div className="col-1 p-0">
              <p>:</p>
            </div>
            <div className="col-4">
              <input
                type="text"
                id="username"
                className="input-text"
                value={!isEdit ? dataAdmin.username : dataInput.username}
                disabled={isDisable}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="bg-data-info row">
            <div className="col-4">
              <p className="text-data-info">Password</p>
            </div>
            <div className="col-1 p-0">
              <p>:</p>
            </div>
            <div className="col-4 d-flex justify-content-center mx-2">
              <input
                type={typePassword}
                id="password"
                className="input-text mx-2"
                value={!isEdit ? dataAdmin.password : dataInput.password}
                disabled={isDisable}
                onChange={handleInput}
              />
              <div className="lihat-password">
                {isHiddenPass ? (
                  <BsEyeFill
                    size="1.2em"
                    color="#0E8388"
                    onClick={handleHiddenPass}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <BsEyeSlashFill
                    size="1.2em"
                    color="#0E8388"
                    onClick={handleShowPass}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-data-info row">
            <div className="col-4">
              <p className="text-data-info">Daftar Penjual</p>
            </div>
            <div className="col-1 p-0">
              <p>:</p>
            </div>
            <div className="col-4">
              <a target="blank" href="http://localhost:3000/daftar-penjual">
                <p className="text-data-info">
                  http://localhost:3000/daftar-penjual
                </p>
              </a>
            </div>
          </div>

          <div className="row my-2">
            <div className="col d-flex justify-content-center">
              {!isEdit ? (
                <button
                  className="btn btn-warning"
                  onClick={handleEdit}
                  style={{ width: "11em" }}
                >
                  Edit
                </button>
              ) : (
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleBatal}
                      style={{ width: "8em" }}
                    >
                      Batal
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="but-input-item-penjual"
                      onClick={handleSimpan}
                      style={{ width: "8em" }}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isAlertHijau ? (
        <AlertHijau
          textAlert={textAlert}
          isAlert={isAlertHijau}
          setIsAlert={setIsAlertHijau}
        />
      ) : (
        <div></div>
      )}
      {isAlertMerah ? (
        <AlertMerah
          textAlert={textAlert}
          isAlert={isAlertMerah}
          setIsAlert={setIsAlertMerah}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DataAdmin;
