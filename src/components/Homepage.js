import './homepage.css'
import Items from './Items';
import Recomendation from './Recomendation';
import Navbar from './Navbar';
import Footer from './Footer';
import data from './data.json'

import { useEffect, useState } from 'react';

const Homepage = () => {

    const [dataItem, setDataItem] = useState({})
    const [dataLength, setDataLength] = useState()

    useEffect(() => {
        setDataLength(data.items.length)

        for(let i = 0 ; i < data.items.length ; i++){
            setDataItem(data.items[i])
            console.log(data.items[i].nama_barang)
        }
    },[]) 

    console.log(data.items.length)

    return ( 
        <div className="homepage">
            <div className="sticky-top">
                <Navbar/>
            </div>
            <div className="container">
                <div className='row'>
                    <div className="col">
                    <Recomendation/>
                    </div> 
                </div>

                <div className="row">
                    <div className="col">
                        <p>{dataItem[1]}</p>
                        <Items dataItem={dataItem} datalength={dataLength}/>    
                    </div>
                </div>

            </div>
            <div className="">   
                <Footer/>       
            </div>
        </div>
     );
}
 
export default Homepage;