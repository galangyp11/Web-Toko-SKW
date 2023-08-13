import { useEffect, useState } from "react";
import "./emailcc.css";
import emailjs from "@emailjs/browser";
import { MdOutlineEmail, MdKeyboardArrowDown } from "react-icons/md";
import { BsCheck } from "react-icons/bs";

const EmailCC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPesanTerkirm, setIsPesanTerkirim] = useState(false);
  const [textNotifPesan, setTextNotifPesan] = useState("");
  const [dataPesan, setDataPesan] = useState({
    email: "",
    pesan: "",
    tanggal: "",
  });
  const tanggal = new Date();

  const handleInput = (e) => {
    e.preventDefault();

    setDataPesan((data) => ({ ...data, [e.target.id]: e.target.value }));
  };

  const handleKirim = (e) => {
    e.preventDefault();

    if (dataPesan.pesan === "" && dataPesan.email === "") {
      setIsPesanTerkirim(false);
    } else if (dataPesan.email === "") {
      setIsPesanTerkirim(true);
      setTextNotifPesan("Email tidak boleh kosong!");
    } else if (dataPesan.pesan === "") {
      setIsPesanTerkirim(true);
      setTextNotifPesan("Pesan tidak boleh kosong!");
    } else {
      const tgl_input =
        tanggal.getDate() +
        "/" +
        (+tanggal.getMonth() + 1) +
        "/" +
        tanggal.getFullYear();
      setDataPesan((data) => ({ ...data, tanggal: tgl_input }));

      emailjs
        .send(
          "service_66ojacq",
          "template_kglw8uv",
          dataPesan,
          "w3RTvXknr0E_40EQG"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );

      setIsPesanTerkirim(true);
      setTextNotifPesan("Pesan Terkirim");
      setDataPesan((data) => ({ ...data, email: "", pesan: "", tanggal: "" }));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsPesanTerkirim(false);
    }, 1500);
  }, [isPesanTerkirm]);

  return (
    <div className="email-cc">
      <div
        className="row d-flex align-items-center head-email"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="col-2">
          <MdOutlineEmail size={25} color="#E7F6F2" />
        </div>
        <div className="col" style={{ height: "100%" }}>
          <p className="text-head-email d-flex align-items-center justify-content-center">
            Customer Services
          </p>
        </div>
        <div className="col-2">
          <MdKeyboardArrowDown
            size={25}
            color="#E7F6F2"
            className={isOpen ? "arrow" : "arrow-open"}
          />
        </div>
      </div>

      {!isOpen ? (
        <></>
      ) : (
        <div className="row body-email d-flex justify-content-center gap-1 py-4">
          <div className="row">
            <input
              type="text"
              id="email"
              className="input-text"
              placeholder="Email"
              onChange={handleInput}
            />
          </div>

          <div className="row mt-3" style={{ height: "100%" }}>
            <p className="d-flex justify-content-start align-items-center text-body-email">
              Pesan :
            </p>
          </div>

          <div className="row">
            <textarea
              className="input-text"
              id="pesan"
              style={{ resize: "none", height: "100px" }}
              onChange={handleInput}
            ></textarea>
          </div>

          <div
            className="row mt-3 d-flex justify-content-center"
            style={{ height: "100%" }}
          >
            <div className="col">
              {isPesanTerkirm ? (
                <div
                  className={`${
                    textNotifPesan === "Pesan Terkirim"
                      ? "bg-pesan-terkirim"
                      : "bg-pesan-terkirim-merah"
                  }`}
                >
                  <p className="text-pesan-terkirim d-flex align-items-center justify-content-center lh-1 px-3 my-2">
                    {textNotifPesan}
                  </p>
                </div>
              ) : (
                <p className="d-flex align-items-center text-info-email lh-1">
                  Pesan akan dikirim ke Email customer service
                </p>
              )}
            </div>
            <div className="col-5 d-flex align-items-center">
              <button className="but-kirim-email" onClick={handleKirim}>
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailCC;
