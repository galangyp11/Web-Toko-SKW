import './navbaradmin.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import skw from '../image/logo-skw.png'

const NavabarProfile = () => {

    const navigate = useNavigate()
    
    const handleLogout = () => {
        Cookies.remove('id')
        setTimeout(()=>{
            navigate('/')
        }, 100)
    }
    
    return (
        <div className="navbar-admin d-flex align-items-center justify-content-center">
            <div className="row " style={{ width:'95dvw', height:'100%'}}>
                <div className="col-2">
                    <img className='logo' src={skw} alt="logo bang"/>
                </div>

                <div className="col ">
                    <p className='text-navbar-admin d-flex justify-content-center align-items-center'> Halaman admin </p>
                </div>

                <div className="col-2 d-flex align-items-center justify-content-end">
                    <div className="but-logout-admin ">
                        <p className='text-logout-admin d-flex justify-content-center align-items-center' onClick={handleLogout}> Logout </p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NavabarProfile;