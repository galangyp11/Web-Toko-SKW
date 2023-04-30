import { useEffect, useState } from 'react';
import './items.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Items = () => {

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

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
    
    console.log(datum)

    return ( 
        <div className="items m-5 p-4">
            <div className="row gap-4 d-flex justify-content-center align-items-center row-cols-5">
               
                    { datum.map((item) => {
                        return(
                  
                        <div className="item m-3" key={item.id_item} style={{cursor:"pointer", padding:'0px'}}>
                              <Link to={`/  ${item.id_item}`} style={{ textDecoration:"none", color:"black"}}>
                            <div className="img-thumbnail-item " >
                                <img src="" alt="" />
                            </div>
                            <div className="item-name py-1 px-2">
                                <p>{item.nama_item}</p>
                            </div>
                            <div className="item-price px-2">
                                <h5>{formatUang(item.harga_item)}</h5>
                            </div>
                            </Link>
                        </div>
                   
                    )
                    })}
             
            </div>
        </div>
     );
}
 
export default Items;