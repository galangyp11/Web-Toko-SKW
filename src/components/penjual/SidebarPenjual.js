import './sidebarpenjual.css'
import { IoStorefront } from 'react-icons/io5'
import { BiCollection } from 'react-icons/bi'

const SidebarPenjual = () => {

    return ( 
        <div className="sidebar-penjual py-4 d-flex justify-content-center">
            <div className="d-grid gap-3">
                
                    <div class="dropdown-center">
                        <button class="dd-profile-penjual" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <p className='text-sidebar-penjual d-flex justify-content-center align-items-center'><IoStorefront color='white' size="20px" className='mx-3'/>Profile Toko</p>
                        </button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item dd-pembeli">Profile</li>
                            <li class="dropdown-item dd-pembeli"> Logout</li>
                        </ul>
                    </div>

                <div className="row bg-menu-sidebar">
                    <div className="col-3 d-flex justify-content-end align-items-center">
                        <BiCollection color='white' size="20px"/>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <p className='text-sidebar-penjual'>Item Toko</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SidebarPenjual;