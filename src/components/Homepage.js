import './homepage.css'
import Items from './Items';
import Recomendation from './Recomendation';
import Navbar from './Navbar';
import Footer from './Footer';

import { useEffect, useState } from 'react';

const Homepage = ({datum}) => {

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
                        <Items datum={datum}/>    
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