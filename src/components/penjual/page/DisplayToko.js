import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './displaytoko.css'
import apiHost from '../../../constants/apiHost';

import { HiOutlineLocationMarker } from "react-icons/hi";
import {IoLogoWhatsapp} from "react-icons/io"
import {MdEmail} from "react-icons/md"

const DisplayToko = () => {

    const [dataPenjual, setDataPenjual] = useState({})
    const [itemsPenjual, setItemsPenjual] = useState([])
    const { id } = useParams();

    useEffect(()=>{
        const getDataPenjual = async() =>{
            const response = await axios.get(`${apiHost}penjual/${id}`)
            setDataPenjual(response.data)
        }
        getDataPenjual()

        const getItemsPenjual = async() =>{
            const response = await axios.get(`${apiHost}item-penjual/${id}`)
            setItemsPenjual(response.data)
        }
        getItemsPenjual()
    },[])

    const formatUang = (number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(number);
      };
    console.log(dataPenjual)
    return ( 
        <div className="display-toko container">
            <div className="row my-3">
                <div className="col-2">
                    <div className="bg-foto-profil-toko">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="col">
                    <p className='text-nama-toko-display d-flex align-items-center'>{dataPenjual.nama_toko}</p>
                </div>
            </div>

            <hr />

            <div className="row ">
                <p className='my-1'><HiOutlineLocationMarker className='mx-2' size={25} color='#0E8388'/>{dataPenjual.alamat_toko}</p> 
                <p className='my-1'><IoLogoWhatsapp className='mx-2' size={24} color='#0E8388'/>{dataPenjual.whatsapp}</p>
                <p className='my-1'><MdEmail className='mx-2' size={24} color='#0E8388'/>{dataPenjual.email}</p>
            </div>

            <div className="row my-5">
                <p className='text-item-toko-display'>Item Toko :</p>
       
                        <div className='bg-items d-flex justify-content-center'>
                            <div className='items p-4 d-flex justify-content-center'>
                                <div className="row gap-4 d-flex justify-content-center align-items-center row-cols-5">
                                    {itemsPenjual.map((item)=>{
                                        return(
                                            <div className="item m-2" key={item.id_item} style={{cursor:"pointer", padding:'0px'}}>
                                            <Link to={`/item/${item.id_item}`} style={{ textDecoration:"none", color:"black"}}>
                                            <div className="img-thumbnail-item" >
                                                <img className='item-image' src={item.gambar} alt=""/>
                                            </div>
                                            <div className="item-thumb-desc item-name mt-1 mx-2">
                                                <p className='text-item-name'>{item.nama_item}</p>
                                            </div>
                                            <br />
                                            <div className="item-thumb-desc item-price mx-2">
                                                <p className='text-item-price'>{formatUang(item.harga_item).replace(/,00/g, '')}</p>
                                            </div>
                                            <div className="item-thumb-desc mx-2 ">
                                                <p className='text-item-toko d-flex align-items-end pb-1'>{item.nama_toko}</p>
                                            </div>
                                            </Link>
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
            </div>
        </div>
     );
}
 
export default DisplayToko;