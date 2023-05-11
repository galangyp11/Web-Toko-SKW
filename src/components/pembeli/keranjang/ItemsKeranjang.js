import './itemskeranjang.css'
import kura from '../../image/kuraplongo.jpg'

import { FaMinusSquare } from "react-icons/fa";


const ItemsKeranjang = () => {
    return ( 
        <div className="items-keranjang border">
            <div className="row d-flex justify-content-center align-items-center px-3" style={{height:"100%"}}>
                <div className="col-2 border">
                    <img className='img-items-keranjang' src={kura} />
                </div>
                <div className="col border">
                    <div className="row">
                        <p>Kura-kura Tolol</p>
                    </div>  
                   <div className="row">
                        <p>Rp. 50.000</p>
                   </div>
                    
                </div>
                <div className="col-2 border">
                    <div className="row border">
                        <div className="col-4 border">
                            <p>Jumlah</p>
                        </div>
                        <div className="col border d-flex justify-content-center align-items-center">
                            <button className='but-jumlah-keranjang '>-</button>
                                <p className='text-jumlah-keranjang px-3 py-2'>1</p>
                            <button className='but-jumlah-keranjang'>+</button>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="col-2 border d-flex justify-content-end">
                    <FaMinusSquare size="40px" color='red' style={{cursor:"pointer"}}/>
                </div>
            </div>
        </div>
     );
}
 
export default ItemsKeranjang;