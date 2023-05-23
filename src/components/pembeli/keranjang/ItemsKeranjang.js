import './itemskeranjang.css'
import kura from '../../image/kuraplongo.jpg'
import axios from 'axios';

import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ItemsKeranjang = ({datum, setDatum, totalHarga, setTotalHarga, totalItem}) => {

    const [disable, setDisable] = useState(true)
    const handleDelete = async(id, e) => {
        e.preventDefault()
        try {
            await axios.delete(`http://localhost:3311/keranjang/${id}`)
            // window.location.reload()
            // console.log(id)
            // console.log('udh keapus bang', datum)  
            
            const dataFillter = datum.filter(item => item.id_keranjang !== id)
            setDatum(dataFillter)
            
        } catch (error) {
            console.log(error)
        }
    
    }

    useEffect(()=>{
        if(totalItem.current >= 1){
            setDisable(false)
        } else (
            setDisable(true)
        )

    },[])

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    const handlePlus = (harga, e) => {
        e.preventDefault()
        totalItem.current = totalItem.current + 1
        setTotalHarga((data)=>({...data,
            harga_item: harga * totalItem.current
        }))
    }


    const handleMinus = (harga, e) => {
        e.preventDefault()
        totalItem.current = totalItem.current - 1
        setTotalHarga((data)=>({...data,
            harga_item: harga * totalItem.current
        }))
    }



    console.log(totalItem)
    console.log(totalHarga)
    console.log(disable)

    return (
        datum.map((item)=>{
            // const foto = btoa(String.fromCharCode(...new Uint8Array(item.foto_item.data)))
            return(
                <div className="items-keranjang my-3" key={item.id_keranjang}>
                    <div className="row d-flex justify-content-center align-items-center px-3" style={{height:"100%", width:"100%"}}>
                        <div className="col-3  d-flex justify-content-center align-items-center" style={{height:"100%"}}>
                            <img className='img-items-keranjang' src={`data:image/png;base64,`} />
                        </div>
                        <div className="col  py-2" style={{height:"100%"}}>
                            <div className="row">
                                <p className='text-nama-item-keranjang' >{item.nama_item}</p>
                            </div>  
                        <div className="row">
                                <p>{formatUang(item.harga_item).replace(/\,00/g, '')}</p>
                        </div>
                            
                        </div>
                        <div className="col-3 ">
                            <div className="row d-flex justify-content-center">
                                <div className="col-4 ">
                                    <p>Jumlah</p>
                                </div>
                            </div>
                            <div className="row ">   
                                <div className="col  d-flex justify-content-center align-items-center">
                                    <button className='but-jumlah-keranjang' onClick={(e)=>handleMinus(item.harga_item, e)} disabled={disable}>-</button>
                                        <p 
                                            className='text-jumlah-keranjang px-3 py-2' 
                                            // placeholder={item.jumlah}
                                            // value={}
                                            // onChange={(e)=>handleChange(totalItem.current, e)}
                                        >{totalItem.current}</p>
                                    <button className='but-jumlah-keranjang' onClick={(e)=>handlePlus(item.harga_item, e)}>+</button>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="col-1  d-flex justify-content-center align-items-center" style={{height:"100%"}}>
                            <div onClick={(e)=> handleDelete(item.id_keranjang, e)}>
                                <MdOutlineCancel size="30px" color='grey' className='but-delete-keranjang' />
                            </div>
                        </div>
                    </div>
            
                </div>
            )
        })
     );
}
export default ItemsKeranjang;