import './category.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {

    const [datum, setDatum] = useState([])

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/kategori`)
            setDatum(response.data)
            // console.log(response)
        }
        dataDB()
    },[])
    
    return ( 
        <div className="category d-flex justify-content-center">
            <div className="row d-flex justify-content-center align-items-center" style={{ width:"60dvw"}}>
                {datum.map((kategori)=>{
                    const foto = btoa(String.fromCharCode(...new Uint8Array(kategori.foto_kategori.data)));
                    return(
                        <div className="item-recomend m-4 " key={kategori.id_kategori}>
                            <Link to={`/kategori/${kategori.id_kategori}`} style={{ textDecoration:"none", color:"black"}}>
                                <div className="row">
                                    <div className="recomend-thumbnail ">
                                        <img className='img-thumbnail' src={`data:image/png;base64,${foto}`} alt=""/>
                                    </div>
                                </div>
                                <div className="row">
                                    <h2 className='text-thumbnail text-center'>{kategori.nama_kategori}</h2>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Category;