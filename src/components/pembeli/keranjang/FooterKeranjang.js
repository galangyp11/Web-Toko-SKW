import './footerkeranjang.css'

const FooterKeranjang = () => {
    return ( 
        <div className="footer-keranjang">
           <div className="row px-1 d-flex justify-content-center align-items-start " style={{height:"100%"}}>
                <div className="row d-flex justify-content-center mt-3" >
                    <div className="col-4 border ">
                        <p className="text-total-harga-keranjang d-flex justify-content-center align-items-center" id='text-footer-keranjang'>Total Harga</p>
                    </div>

                    <div className="col-1 border">
                        <p className="text-total-harga-keranjang d-flex justify-content-center align-items-center" id='text-footer-keranjang'>:</p>
                    </div>

                    <div className="col border">
                        <p className="text-total-harga-nominal-keranjang d-flex justify-content-start align-items-center" id='text-footer-keranjang'> Rp. 50.000</p>
                    </div>

                    <div className="row d-flex align-items-center justify-content-start mt-3">
                        <div className="col border ">
                            <button className='but-checkout-footer'>Checkout</button>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <hr />
                    </div>
                </div>
                
                <div className="row border">
                    <p className='text-rincian-harga'>Rincian Harga</p>
                    <div className="row">
                        <p className='text-rincian-isi'>Total item = 1</p>
                        <p></p>
                    </div>
                </div>
               

            
            </div>
        </div>
     );
}
 
export default FooterKeranjang;