import './pagepembeli.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Category from '../Category';
import Items from '../Items';
import Navbar from './NavbarPembeli';
import Footer from '../Footer';
import DescItem from '../DescItem';


const User = () => {

    const [pembeliById, setPembeliById] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getItemById = async () => {
            const response = await axios.get(`http://localhost:3311/pembeli/${id}`);
            setPembeliById(response.data);
            console.log(response.data);
        }
        getItemById();
                
    }, []);

    useEffect(()=>{
        <DescItem pembeliById={pembeliById}/>
    }, [pembeliById])

    console.log(pembeliById.username)

    return ( 
        <div className="page-pembeli">
            <div className="sticky-top">
                <Navbar pembeliById={pembeliById}/>
            </div>
            <div className="homepage-con container">
                <div className='row'>
                    <div className="col">
                    <Category/>
                    </div> 
                </div>

                <div className="row">
                    <div className="col">
                        <Items/>    
                    </div>
                </div>

            </div>
            <div className="">   
                <Footer/>       
            </div>
        </div>
     );
}
 
export default User;