import './keranjang.css'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import FooterKeranjang from './FooterKeranjang';
import ItemsKeranjang from './ItemsKeranjang';
import NavbarKeranjang from './NavbarKeranjang'
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';


const Keranjang = () => {

    const [datum, setDatum] = useState([])
    const [isKosong, setIsKosong] = useState(true)
    const id = Cookies.get('id')

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/keranjang/${id}`)
            setDatum(response.data)
            console.log(response)
        }
        dataDB()
    },[]) 

    useEffect(()=>{
      if(datum.length != 0){
        setIsKosong(false)
      }  else {
        setIsKosong(true)
      }

    })


    // console.log(isKosong)
    // console.log(datum)
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
                        <FooterKeranjang datum={datum} isKosong={isKosong}/>
                    </div>
                </div> 
            </div>
        </div>
     );
}
 
export default Keranjang;