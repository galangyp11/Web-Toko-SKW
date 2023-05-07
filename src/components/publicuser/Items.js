import { useEffect, useState } from 'react';
import './items.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Items = () => {

    const [datum, setDatum] = useState([])

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/item`)
            setDatum(response.data)
            // console.log(response)
        }
        dataDB()
    },[]) 

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
    
    // console.log(datum)

    return ( 
        <div className="bg-items my-5 d-flex justify-content-center" style={{width:"100%"}}>
            <div className="items p-4 d-flex justify-content-center">
                <div className="row gap-4 d-flex justify-content-center align-items-center row-cols-5">
                
                        { datum.map((item) => {
                            const foto = btoa(String.fromCharCode(...new Uint8Array(item.foto_item.data)));
                            return(
                            
                            <div className="item m-3" key={item.id_item} style={{cursor:"pointer", padding:'0px'}}>
                                <Link to={`/item/${item.id_item}`} style={{ textDecoration:"none", color:"black"}}>
                                    <div className="img-thumbnail-item " >
                                        <img className='item-image' src={`data:image/png;base64,${foto}`} alt="" />
                                    </div>
                                    <div className="item-name py-1 px-2">
                                        <p>{item.nama_item}</p>
                                    </div>
                                    <div className="item-price px-2">
                                        <h5>{formatUang(item.harga_item).replace(/,00/g, '')}</h5>
                                    </div>
                                </Link>
                            </div>
                    
                        )
                        })}
                
                </div>
            </div>
        </div>
     );
}
 
export default Items;