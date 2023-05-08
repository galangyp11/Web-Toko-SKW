import './footer.css'
import kucing from '../image/kucinglowpixel.jpg'
import kura from '../image/kuraplongo.jpg'

import { BsInstagram } from "react-icons/bs";
import { BsTiktok } from "react-icons/bs";


const Footer = () => {
    return ( 
        <div className="footer p-5">
            <div className="row" style={{height:"100%"}}>
                <div className="col ">
                    <div className="row"></div>
                    <h2 className='footer-text'>Tentang</h2>

                    <p className='footer-text'>Web Toko SKW merupakan sebuah wadah untuk begitu yang mana akan mempermudah begituan antar begituan</p>
                </div>

                <div className="col">

                </div>

                <div className='col' style={{ height:"100%"}}>
                    <div className="row my-2 d-flex justify-content-end">
                        <img className="sponsor" src={kucing} alt="" />
                    </div>

                    <div className="row my-2 d-flex justify-content-end">
                        <img className="sponsor" src={kura} alt="" />
                    </div>

                    <div className="row my-5 ">
                        <div className="col d-flex justify-content-end">
                            <BsInstagram color='#E7F6F2' size='25px' className='mx-2'/> <BsTiktok color='#E7F6F2' size='25px' className='mx-2'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;