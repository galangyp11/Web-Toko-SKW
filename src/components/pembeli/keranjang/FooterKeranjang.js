import { useEffect, useState } from 'react';
import './footerkeranjang.css'
import { useNavigate } from 'react-router-dom';

const FooterKeranjang = ({datum, isKosong}) => {

    const [harga, setHarga] = useState('')
    const [totalItem, setTotalItem] = useState('')
    const navigate = useNavigate()
    const [dataInput, setDataInput] = useState({
        id_admin: '',
        id_item: '',
        id_keranjang: '',
        total_harga: '',
        total_jumlah: ''
    });

    useEffect(()=>{
        try {
            let sum = 0
            datum.forEach(element => {
                sum += element.harga_item
                setHarga(sum)
            });
    
            setTotalItem(datum.length)
        } catch (error) {
            console.log(error)
        }
       
        
    },[])

    const handleCheckout = (e) =>{
        if(isKosong === true){
            alert('Keranjang Kamu Kosong')
        } else {
        //     datum.map((keranjang)=>({
        //         return(
        
        //     setDataInput((data) => ({...data,
        //         id_admin : e.target.id,
        //         id_item : e.target.value,
        //         id_keranjang : e.target.value,
        //         total_harga : e.target.value,
        //         total_jumlah : e.target.value
        //     }))
                        
        //     )
        // }))
            navigate('/checkout')
        }
    }

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    console.log(dataInput)
    return ( 
        <div className="footer-keranjang">
           <div className="row px-1 d-flex justify-content-center align-items-start " style={{height:"100%"}}>
                <div className="row d-flex justify-content-center mt-3" >
                    <div className="col-4 ">
                        <p className="text-total-harga-keranjang d-flex justify-content-center align-items-center" id='text-footer-keranjang'>Total Harga</p>
                    </div>

                    <div className="col-1">
                        <p className="text-total-harga-keranjang d-flex justify-content-center align-items-center" id='text-footer-keranjang'>:</p>
                    </div>

                    <div className="col">
                        <p className="text-total-harga-nominal-keranjang d-flex justify-content-start align-items-center" id='text-footer-keranjang'>{formatUang(harga).replace(/\,00/g, '')}</p>
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
                            <p className='text-rincian-isi'>Total item ({totalItem})</p>
                        </div>
                        <div className="col">
                            <p>{harga}</p>
                        </div>
                    
                    </div>
                </div>
               

            
            </div>
        </div>
     );
}
 
export default FooterKeranjang;