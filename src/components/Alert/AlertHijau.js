import { useEffect } from "react";
import "./alert.css";
import { Modal } from "react-bootstrap";

const Alert = ({ textAlert, isAlert, setIsAlert, setIsEdit }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsAlert(false);
      // setIsEdit(false);
    }, 1500);
  }, []);

  return (
    <Modal
      className="modal-alert"
      show={isAlert}
      backdrop={false}
      animation={true}
      size="md"
    >
      <div className="bg-alert-hijau">
        <p className="text-alert-merah d-flex justify-content-center align-items-center ">
          {textAlert}
        </p>
      </div>
    </Modal>
  );
};

export default Alert;
