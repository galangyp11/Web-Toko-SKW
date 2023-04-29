import { useEffect, useState } from 'react';
import './items.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Items = () => {

    const navigate = useNavigate()
    const url = useParams()    
    const [datum, setDatum] = useState([])

    useEffect(()=>{

        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/`)
            setDatum(response.data)
            console.log(response)
            
        }

        dataDB()
    },[]) 

    
    console.log(datum)

    return ( 
        <div className="items m-5 p-4">
            <div className="row gap-4 d-flex justify-content-center align-items-center row-cols-5">
               
                    { datum.map((item) => {
                        return(
                    <div className="item m-3" key={item.id} onClick={()=>navigate(`/${item.nama_item}`)} style={{cursor:"pointer", padding:'0px'}}>
                        <div className="img-thumbnail-item " >
                            <img src={()=>{URL.createObjectURL(item.foto_item)}} alt="" />
                        </div>
                        <div className="item-name py-1 px-2">
                            <p>{item.nama_item}</p>
                        </div>
                        <div className="item-price px-2">
                            <h5>Rp.{item.harga_item}</h5>
                        </div>
                    </div>
                    )
                    })}
             
            </div>
        </div>
     );
}
 
export default Items;