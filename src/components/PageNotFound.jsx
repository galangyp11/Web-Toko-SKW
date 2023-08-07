import "./pagenotfound.css";
import { ImSad } from "react-icons/im";

const PageNotFound = () => {
  return (
    <div className="page-not-found d-flex align-items-center justify-content-center">
      <div className="halaman-tidak-ada d-flex align-items-center justify-content-center">
        <p className="teks-halaman-tidak-ada d-flex align-items-center">
          Halaman tidak ditemukan <ImSad style={{ marginLeft: ".5em" }} />
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
