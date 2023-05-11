import './sidebarpenjual.css'
import { IoStorefront } from 'react-icons/io5'
import { BiCollection } from 'react-icons/bi'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const SidebarPenjual = () => {

    let navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('id')
        setTimeout(()=>{
            navigate('/')
        }, 100)
    };

    return ( 
        <div className="sidebar-penjual py-4 d-flex justify-content-center">
            <div className="d-grid ">
    
               
                    <div class="dropdown-center">
                        <button class="dd-profile-penjual" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <p className='text-sidebar-penjual d-flex justify-content-center align-items-center'><IoStorefront color='white' size="20px" className='mx-3'/>Profile Toko</p>
                        </button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item dd-pembeli">Profile</li>
                            <li class="dropdown-item dd-pembeli"> Logout</li>
                        </ul>
                    </div>

                <div class="dropdown-center">
                    <button class="dd-profile-penjual" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <p className='text-sidebar-penjual d-flex justify-content-center align-items-center'><BiCollection color='white' size="20px" className='mx-3'/>Item Toko</p>
                    </button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item dd-pembeli">Item Saya</li>
                        <li class="dropdown-item dd-pembeli">Masukkan Item</li>
                    </ul>
                </div>
                

       
                    <div className="but-logout-penjual ">
                        <p className='text-logout-penjual d-flex justify-content-center align-items-center' onClick={handleLogout}> Logout </p>
                    </div>
                
            </div>
        </div>
     );
}
 
export default SidebarPenjual;