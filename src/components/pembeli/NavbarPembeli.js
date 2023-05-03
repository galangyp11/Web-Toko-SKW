import fotoKosing from '../image/kuraplongo.jpg'
import logo from '../image/logo-skw.png'
import search from '../image/search.png'
import './navbarpembeli.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({pembeliById}) => {

    const navigate = useNavigate()
    const [foto, setFoto] = useState()
    const [isDropdown, setIsDropdown] = useState(false)

    setTimeout(()=>{
        try {
            setFoto(btoa(String.fromCharCode(...new Uint8Array(pembeliById.foto_profil.data))))
        } catch (error) {
            console.log('sabar bang fotonya lagi loading')
        }
    }, 100)

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
                        <div className="col ">
                            <div className="row bg-profile d-flex justify-content-center align-items-center" onClick={()=>{setIsDropdown(!isDropdown)}}>
                                <div className="bg-photo-profile d-flex justify-content-center align-items-center">
                                    <img className='photo-profile' src={ `data:image/png;base64,${foto}`} alt="Photo-profile" />
                                </div>

                                <div className="bg-profile-pembeli px-3 d-flex justify-content-center" >
                                    <p className='profile-pembeli'>{pembeliById.username}</p>
                                </div>
                            </div>

                            <div className="row">
                                <ul className={`mt-2 dropdown-profile ${isDropdown? 'active' : 'inactive'}`}>
                                    <li className='dropdown-list'>Profile</li>
                                    <li className='dropdown-list' id='but-logout' onClick={()=>navigate('/')} >Logout</li>
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