import './descitem.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';

const DescItem = ({pembeliById}) => {

    const [itemById, setItemById] = useState({})
    const [foto, setFoto] = useState()
    const {id} = useParams()

    useEffect(() => {
        const getItemById = async () => {
            const response = await axios.get(`http://localhost:3311/item/${id}`);
            setItemById(response.data);
            console.log(response.data);
        }
        getItemById();
                
    }, []);
    

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    setTimeout(()=>{
        try {
            setFoto(btoa(String.fromCharCode(...new Uint8Array(itemById.foto_item.data))))
        } catch (error) {
            console.log('sabar bang fotonya lagi loading')
        }
    }, 100)

    console.log(pembeliById)

    return ( 
        <div className="descitem">
            <div className="sticky-top">
                <Navbar/>
            </div>
            <div className="desc-item-con container ">
                <div className="row pt-4" style={{ overflow:"hidden"}}>
                    <div className="col d-flex justify-content-center">
                        <div className="desc-kiri">
                            
                            <img className='item-desc-image' src={`data:image/png;base64,${foto}`} alt=""/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="desc-kanan p-4">
                            <div className="row">
                                <h2>{itemById.nama_item}</h2>
                            </div>
                            <div className="row">
                                <h4>{formatUang(itemById.harga_item).replace(/\,00/g, '')}</h4>
                            </div>
                            <div className="row">
                                <p>{itemById.deskripsi_item}</p>
                            </div>
                            <div className="row d-flex justify-content-end align-items-end" style={{height:"80%"}}>
                                <div className="but-cart d-flex justify-content-center align-items-center">
                                    <h6 className='text-but-cart text-center'>Tambahkan ke Keranjang</h6>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default DescItem;