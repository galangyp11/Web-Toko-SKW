import './checkout.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

import NavbarCheck from './NavbarCheck'

const CheckPembeli = () => {

    const [datum, setDatum] = useState([])

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/checkout`)
            setDatum(response.data)
            // console.log(response)
        }
        dataDB()
    },[]) 

    console.log(datum)
    return ( 
        <div className="check-pembeli">
             <div className="sticky-top">
                <NavbarCheck/>
            </div>

            <div className="keranjang-con container mt-2 border">
                
            </div>
        </div>
     );
}
 
export default CheckPembeli;