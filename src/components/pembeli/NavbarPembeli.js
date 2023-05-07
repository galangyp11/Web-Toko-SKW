import Cookies from 'js-cookie';
import fotoKosing from '../image/kuraplongo.jpg';
import logo from '../image/logo-skw.png';
import search from '../image/search.png';
import './navbarpembeli.css';

import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

    const [pembeliById, setPembeliById] = useState({});
    const navigate = useNavigate()
    const [foto, setFoto] = useState()
    const [isDropdown, setIsDropdown] = useState(false)
    const id = Cookies.get('id')

    useEffect(() => {
        const getItemById = async () => {
            const response = await axios.get(`http://localhost:3311/pembeli/${id}`);
            setPembeliById(response.data);
            console.log(response.data);
        }
        getItemById();
                
    }, []);

    setTimeout(()=>{
        try {
            setFoto(btoa(String.fromCharCode(...new Uint8Array(pembeliById.foto_profil.data))))
        } catch (error) {
            setFoto(fotoKosing)
            console.log('sabar bang fotonya lagi loading')
        }
    }, 100)

    const handleLogout = () => {
        navigate('/')
        Cookies.remove('id')
    }

    console.log(pembeliById)

    return ( 
        <div className="navbar d-flex align-items-center justify-content-center">
            <div className="row " style={{ width:'90dvw', height:'100%'}}>
                <div className="col d-flex align-items-center" style={{ height:'100%'}}>
                    <img className='logo' src={logo} alt="logo bang" onClick={()=>navigate("/")}/>
                </div>

                <div className="col-3 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                    <input className='search p-2 text-center' type="text" placeholder='Search' />                 
                </div>

                <div className="col-1 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                    <div className="logo-search d-flex justify-content-center">
                        <img className='p-1' src={search} alt=""/>
                    </div>
                </div>
                
                <div className="col d-flex justify-content-end align-items-center" style={{ height:'100%'}}>
                    <div className="row" style={{height:"100%"}}>
                        <div className="col">
                            <div className="row bg-profile d-flex justify-content-center align-items-center" onClick={()=>{setIsDropdown(!isDropdown)}}>
                                <div className="bg-photo-profile d-flex justify-content-center align-items-center">
                                    <img className='photo-profile' src={ `data:image/png;base64,${foto}`} alt="Photo-profile" />
                                </div>

                                <div className="bg-profile-pembeli px-3 d-flex justify-content-center" >
                                    <p className='profile-pembeli'>{pembeliById.username}</p>
                                </div>
                            </div>

                            <div className="row">
                                <ul className={`dropdown-profile ${isDropdown? 'active' : 'inactive'}`}>
                                    <li className='dropdown-list' onClick={()=>navigate('/profile')}>Profile</li>
                                    <li className='dropdown-list' id='but-logout' onClick={handleLogout} >Logout</li>
                                </ul>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;