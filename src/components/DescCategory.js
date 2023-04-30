import './desccategory.css'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const DescCategory = () => {

    const [datum, setDatum] = useState([])
    const category = ['Makanan', 'Minuman', 'Pakaian']

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/`)
            setDatum(response.data)
            console.log(response)
        }
        dataDB()
    },[]) 

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    return ( 
        <div className="desc-category">
            <div className="fixed-top">
                <Navbar/>

                <div className="container">
                    <div className="row d-flex align-items-center " style={{width:"100%", height:"40px", backgroundColor:"white"}}>
                        <div className="col-1 ">
                            <h5>Kategori</h5>
                        </div>
                        
                        <div className="col">
                            <select className='select'>
                            {category.map((category, index)=>{
                                return <option key={index}>
                                    {category}
                                </option>
                            })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="desc-category-con container d-flex justify-content-center py-5">
               
                <div className="items mt-5 p-4">
            <div className="row gap-4 d-flex justify-content-center align-items-center row-cols-5">
               
                    { datum.map((item) => {
                        const foto = btoa(String.fromCharCode(...new Uint8Array(item.foto_item.data)));
                        return(
                        
                        <div className="item m-3" key={item.id_item} style={{cursor:"pointer", padding:'0px'}}>
                              <Link to={`/${item.id_item}`} style={{ textDecoration:"none", color:"black"}}>
                            <div className="img-thumbnail-item " >
                                <img className='item-image' src={`data:image/png;base64,${foto}`} alt="" />
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
     );
}
 
export default DescCategory;