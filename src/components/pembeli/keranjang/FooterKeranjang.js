import { useEffect, useState } from 'react';
import './footerkeranjang.css'

const FooterKeranjang = ({datum, handleCheckout, totalHarga}) => {

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    console.log(totalHarga)
    return ( 
        <div className="footer-keranjang mt-3">
           <div className="row px-1 d-flex justify-content-center align-items-start " style={{height:"100%"}}>
                <div className="row d-flex justify-content-center mt-3" >
                    <div className="col-4 ">
                        <p className="text-total-harga-keranjang d-flex justify-content-center align-items-center" id='text-footer-keranjang'>Total Harga</p>
                    </div>

                    <div className="col-1">
                        <p className="text-total-harga-keranjang d-flex justify-content-center align-items-center" id='text-footer-keranjang'>:</p>
                    </div>

                    <div className="col">
                        <p className="text-total-harga-nominal-keranjang d-flex justify-content-start align-items-center" id='text-footer-keranjang'>{formatUang(totalHarga).replace(/\,00/g, '')}</p>
                    </div>

                    <div className="row d-flex align-items-center justify-content-start mt-3">
                        <div className="col ">
                            <button className='but-checkout-footer' onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <hr />
                    </div>
                </div>
                
                <div className="row">
                    <p className='text-rincian-harga'>Rincian Harga</p>
                    <div className="row">
                        <div className="col">
                            <p className='text-rincian-isi'>Total item : {datum.length}</p>
                        </div>
                        <div className="col">
                            <p>{formatUang(totalHarga).replace(/\,00/g, '')}</p>
                        </div>
                    
                    </div>
                </div>
               

            
            </div>
        </div>
     );
}
 
export default FooterKeranjang;