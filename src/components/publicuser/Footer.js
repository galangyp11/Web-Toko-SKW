import "./footer.css";
import logo from "../image/logo-skw.png";
import sman3 from "../image/sman3.png";
import upi from "../image/upi.png";
import psti from "../image/psti.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import {BiLogoInstagram} from "react-icons/bi";


const Footer = () => {
  return (
    <div className="footer p-5">
      <div className="row" style={{ height: "100%" }}>
        <div className="col">
          <div className="row"></div>
          
          <div className="row">
            <img className="logo" src={logo} alt="" />
          </div>
          <p className="footer-text-1">
          Web Toko SKW merupakan sebuah wadah kegiatan wirausaha siswa SMAN 3 Purwakarta.
          </p>
        </div>

        <div className="col">
          <div className="row" style={{ height: "50%" }}>
            <h2 className="footer-text">Hubungi kami</h2>
              <div className="hubungi-1 d-flex justify-content-left" >         
               <MdOutlineMailOutline color="#E7F6F2" size="30px" className="mx-2" />sman3pwk@gmail.com   
               </div>
               <div className="hubungi-2 d-flex justify-content-left" >         
               <FaWhatsapp color="#E7F6F2" size="30px" className="mx-2" />08155146001   
               </div>
               <div className="hubungi-1 d-flex justify-content-left" >         
               <BiLogoInstagram color="#E7F6F2" size="30px" className="mx-2" />@skwsmanti_   
               </div>
          </div>
        </div>
 
        <div className="col" style={{ height: "100%" }}>
         <h2 className="footer-text">Powered By</h2>
          <div className="row my-2 d-flex justify-content-left">
            <img className="sponsor mx-2" src={sman3} alt="" />
            <img className="sponsor mx-2" src={upi} alt="" />
            <img className="sponsor mx-2" src={psti} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
