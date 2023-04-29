import './descitem.css'
import { useParams } from 'react-router-dom';

import Navbar from './Navbar';

const DescItem = () => {
    const {id} = useParams()

    return ( 
        <div className="descitem">
            <div className="sticky-top">
                <Navbar/>
            </div>
            <div className="container">
                <div className="row pt-4">
                    <div className="col d-flex justify-content-center">
                        <div className="desc-kiri">
                            
                        </div>
                    </div>

                    <div className="col">
                        <div className="desc-kanan p-4">
                            <div className="row">
                                <h2></h2>
                            </div>
                            <div className="row d-flex justify-content-end align-items-end" style={{height:"93%"}}>
                                <div className="but-cart d-flex justify-content-center align-items-center">
                                    <h6 className='text-but-cart text-center'>Tambahkan ke Keranjang</h6>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default DescItem;