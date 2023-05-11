import './keranjang.css'

import FooterKeranjang from './FooterKeranjang';
import ItemsKeranjang from './ItemsKeranjang';
import NavbarKeranjang from './NavbarKeranjang'

const Keranjang = () => {
    return ( 
        <div className="keranjang">
            <div className="sticky-top">
                <NavbarKeranjang/>
            </div>

            <div className="keranjang-con container mt-2">
                <div className="row">
                    <div className="col">
                    <ItemsKeranjang/>
                    </div>

                    <div className="col-4 sticky-top">
                    <FooterKeranjang/>
                    </div>
                </div> 
            </div>
        </div>
     );
}
 
export default Keranjang;