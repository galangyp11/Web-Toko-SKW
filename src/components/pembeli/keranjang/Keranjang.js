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
    const [dataInput, setDataInput] = useState({
        id_keranjang:"",
        jumlah:"",
        total_harga:""
      })
    const [totalHarga, setTotalHarga] = useState()
    const [isKosong, setIsKosong] = useState(true)
    const [disable, setDisable] = useState()
    const id = Cookies.get('id')
    const navigate = useNavigate()

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`${apiHost}keranjang/${id}`)
            setDatum(response.data)
        }
        dataDB()

        let i = 0
        datum.forEach((data)=>{
             i += data.total_harga
            setTotalHarga(i)

            if(data.jumlah == 1){
                setDisable(true)
            } else {
                setDisable(false)
            }
        })
    }) 

    useEffect(()=>{
        if(datum.length != 0){
            setIsKosong(false)
          }  else {
            setIsKosong(true)
          }
    },[datum])
    
    
    useEffect(() => {
        const putData = async() =>{
          await axios.put(`${apiHost}keranjang`, dataInput)
        }
        putData()

    },[dataInput])

    const handleCheckout = async (e) =>{
        if(isKosong === true){
            alert('Keranjang Kamu Kosong')
        } else {
            // await axios.post(`${apiHost}/transaksi`, );
            navigate('/checkout')
        }
    }

    // console.log(isKosong)
    // console.log(datum)
    // console.log(dataInput)
    // console.log(totalHarga)

    return ( 
        <div className="keranjang">
            <div className="sticky-top">
                <NavbarKeranjang/>
            </div>

            <div className="keranjang-con container mt-2">
                <div className="row">
                    <div className="col">
                        {isKosong? <p className='text-keranjang-kosong d-flex justify-content-center align-items-center'>Keranjang Kosong</p> : <ItemsKeranjang datum={datum} setDatum={setDatum} setDataInput={setDataInput} disable={disable}/>}
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