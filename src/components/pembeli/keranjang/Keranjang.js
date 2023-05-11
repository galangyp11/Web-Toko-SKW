import FooterKeranjang from './FooterKeranjang';
import ItemsKeranjang from './ItemsKeranjang';
import './keranjang.css'
import NavbarKeranjang from './NavbarKeranjang'

const Keranjang = () => {
    return ( 
        <div className="keranjang">
            <div className="sticky-top">
                <NavbarKeranjang/>
            </div>

            <div className="keranjang-con container border">
                <ItemsKeranjang/>
            </div>

            <div className="fixed-bottom">
                <FooterKeranjang/>
            </div>
        </div>
     );
}
 
export default Keranjang;