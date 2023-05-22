import './keranjang.css'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import FooterKeranjang from './FooterKeranjang';
import ItemsKeranjang from './ItemsKeranjang';
import NavbarKeranjang from './NavbarKeranjang'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Keranjang = () => {

    const [datum, setDatum] = useState([])
    const [arrObj, setArrObj] = useState([])
    const [datumObj, setDatumObj] = useState({
        id_item:'',
        id_keranjang:'',
        id_pembeli: ''
    })
    const [isKosong, setIsKosong] = useState(true)
    const id = Cookies.get('id')
    const navigate = useNavigate()

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/keranjang/${id}`)
            setDatum(response.data)
        }
        dataDB()     
    },[]) 

    // useEffect(()=>{
    //     const dataObj = () => {
    //         datum.map((data)=>{
    //                 setDatumObj((item) => ({...item,
    //                     id_item: data.id_item ,
    //                     id_keranjang : data.id_keranjang ,
    //                     id_pembeli : data.id_pembeli 
    //                 }))
    //         })
    //     }

    //     dataObj()
    // },[datum])


    useEffect(()=>{
      if(datum.length != 0){
        setIsKosong(false)
      }  else {
        setIsKosong(true)
      }

    })

    const handleCheckout = async (e) =>{
        if(isKosong === true){
            alert('Keranjang Kamu Kosong')
        } else {
            // await axios.post(`http://localhost:3311/checkout`, datumObj);
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
                        {isKosong? <p className='text-keranjang-kosong d-flex justify-content-center align-items-center'>Keranjang Kosong</p> : <ItemsKeranjang datum={datum} setDatum={setDatum} />}
                    </div>

                    <div className="col-4 sticky-top">
                        <FooterKeranjang datum={datum} isKosong={isKosong} handleCheckout={handleCheckout}/>
                    </div>
                </div> 
            </div>
        </div>
     );
}
 
export default Keranjang;