import './desccategory.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import apiHost from '../../constants/apiHost'

const DescCategory = () => {

    const [kategoriById, setKategoriById] = useState([])
    const [kategori, setKategori] = useState([])
    const [namaKategori, setNamaKategori] = useState()
    const {id} = useParams()

    useEffect(()=>{
        const kategoriDB = async () => {
            const response = await axios.get(`${apiHost}kategori`)
            setKategori(response.data)
        }
        kategoriDB()

        const getKategoriById = async () => {
            const response = await axios.get(`${apiHost}kategori/${id}`)
            setKategoriById(response.data)
            console.log(response.data)
        }
        getKategoriById()

        window.scrollTo(0, 0);
    },[]) 

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    setTimeout(()=>{
        try {
            setNamaKategori(kategoriById[0].nama_kategori)
        } catch (error) {
            console.log('bentar bang lagi loading')
        }
    }, 100)

    return ( 
        <div className="desc-category">
            <div className="desc-category-con container d-flex justify-content-center py-2">
                <div className="row mt-4" style={{width:"100%"}}>
                    <div className="desc-kategory-kiri col-2 py-2">
                        <div className="row">
                            <h3>Kategori</h3>
                        </div>
                        <div className="row">
                            <ul className='list-menu-kategori'>
                                { kategori.map((kategori)=>{
                                    return(
                                        <Link key={kategori.id_kategori} to={`/kategori/${kategori.id_kategori}`} onClick={()=>{window.location.href('#')}} style={{ textDecoration:"none", color:"black"}}>
                                            <li className='list-kategori d-flex align-items-center'>{kategori.nama_kategori}</li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="desc-kategory-kanan col py-2" >
                        <div className="row my-1">
                            <h3>{namaKategori}</h3>                      
                        </div>
                        
                         <div className="items p-4">
                            <div className="row gap-4 d-flex justify-content-center align-items-center row-cols-5">
                            
                                    { kategoriById.map((item) => {
                                        // const foto = btoa(String.fromCharCode(...new Uint8Array(item.foto_item.data)));
                                        return(
                                    
                                        <div className="item m-3" key={item.id_item} style={{cursor:"pointer", padding:'0px'}}>
                                            <Link to={`/item/${item.id_item}`} style={{ textDecoration:"none", color:"black"}}>
                                            <div className="img-thumbnail-item " >
                                                <img className='item-image' src='' alt="" />
                                            </div>
                                            <div className="item-name py-1 px-2">
                                                <p>{item.nama_item}</p>
                                            </div>
                                            <div className="item-price px-2">
                                                <h5>{formatUang(item.harga_item).replace(/\,00/g, '')}</h5>
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
        </div>
     );
}
 
export default DescCategory;