import './footerkeranjang.css'

const FooterKeranjang = () => {
    return ( 
        <div className="footer-keranjang">
           <div className="row px-2 d-flex justify-content-center align-items-center " style={{height:"100%"}}>
                <div className="col border">
                    <div className="row " >
                        <div className="col-3 border ">
                            <p className="text-total-harga-keranjang d-flex justify-content-center align-items-center" id='text-footer-keranjang'>Total Harga</p>
                        </div>

                        <div className="col-1 border">
                            <p className="text-total-harga-keranjang d-flex justify-content-center align-items-center" id='text-footer-keranjang'>:</p>
                        </div>

                        <div className="col border">
                            <p className="text-total-harga-nominal-keranjang d-flex justify-content-start align-items-center" id='text-footer-keranjang'> Rp. 50.000</p>
                        </div>
                    </div>
                </div>

                <div className="col border d-flex align-items-center justify-content-end mx-4">
                    <button className='but-checkout-footer'>Checkout</button>
                </div>
            </div>
        </div>
     );
}
 
export default FooterKeranjang;