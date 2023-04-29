import logo from './image/logo-skw.png'
import search from './image/search.png'
import './navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

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
                    <h5>Daftar | Login</h5>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;