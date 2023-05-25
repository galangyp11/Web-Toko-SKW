import './keranjang.css'
import { useState, useEffect, useRef } from 'react';
import apiHost from '../../../constants/apiHost'
import axios from 'axios';

import FooterKeranjang from './FooterKeranjang';
import ItemsKeranjang from './ItemsKeranjang';
import NavbarKeranjang from './NavbarKeranjang'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Keranjang = () => {

    const [datum, setDatum] = useState([])    
    const [totalHarga, setTotalHarga] = useState({
        harga_item:''
    })
    const [isKosong, setIsKosong] = useState(true)
    const id = Cookies.get('id')
    const navigate = useNavigate()

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`${apiHost}keranjang/${id}`)
            setDatum(response.data)
        }
        dataDB()        
    }) 

    useEffect(()=>{
        
        if(datum.length != 0){
            setIsKosong(false)
          }  else {
            setIsKosong(true)
          }

    },[datum])

    const handleCheckout = async (e) =>{
        if(isKosong === true){
            alert('Keranjang Kamu Kosong')
        } else {
            // await axios.post(`${apiHost}/keranjang`, );
            navigate('/checkout')
        }
    }

    // console.log(isKosong)
    console.log(datum)

    // console.log(datumObj)
    return ( 
        <div className="keranjang">
            <div className="sticky-top">
                <NavbarKeranjang/>
            </div>

            <div className="keranjang-con container mt-2">
                <div className="row">
                    <div className="col">
                        {isKosong? <p className='text-keranjang-kosong d-flex justify-content-center align-items-center'>Keranjang Kosong</p> : <ItemsKeranjang datum={datum} setDatum={setDatum} setTotalHarga={setTotalHarga} />}
                    </div>

                    <div className="col-4 sticky-top">
                        <FooterKeranjang datum={datum} isKosong={isKosong} handleCheckout={handleCheckout} totalHarga={totalHarga}/>
                    </div>
                </div> 
            </div>
        </div>
     );
}
 
export default Keranjang;