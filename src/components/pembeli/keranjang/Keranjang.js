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
    const [datumObj, setDatumObj] = useState({
        id_item:'',
        id_keranjang:''
    })
    const [isKosong, setIsKosong] = useState(true)
    const id = Cookies.get('id')
    const navigate = useNavigate()
    // const [dataInput, setDataInput] = useState({
    //     id_admin: '',
    //     id_item: '',
    //     id_keranjang: '',
    //     total_harga: '',
    //     total_jumlah: ''
    // });

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/keranjang/${id}`)
            setDatum(response.data)
            console.log(response)
        }
        dataDB()     
    },[]) 

    useEffect(()=>{
        const dataObj = () => {
            datum.map((data)=>{
            
                    setDatumObj((item) => ({...item,
                        id_item : data.id_item,
                        id_keranjang : data.id_keranjang
                    }))
                
            })
        }

        dataObj()
    },[datum])

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
   
            await axios.post(`http://localhost:3311/checkout`, datumObj);
            alert('udh bang')
            navigate('/checkout')
        }
    }


    // console.log(isKosong)
    // console.log(datum)
    // console.log(datumObj)
    return ( 
        <div className="keranjang">
            <div className="sticky-top">
                <NavbarKeranjang/>
            </div>

            <div className="keranjang-con container mt-2">
                <div className="row">
                    <div className="col">
                        {isKosong? <p className='text-keranjang-kosong d-flex justify-content-center align-items-center'>Keranjang Kosong</p> : <ItemsKeranjang datum={datum}/>}
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