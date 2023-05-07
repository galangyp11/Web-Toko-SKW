import './sidebarpenjual.css'
import { IoStorefront } from 'react-icons/io5'
import { BiCollection } from 'react-icons/bi'

const SidebarPenjual = () => {

    return ( 
        <div className="sidebar-penjual p-4 ">
            <div className="d-grid gap-3 px-2">
                <div className="row bg-menu-sidebar">
                    <div className="col-3 d-flex justify-content-end align-items-center">
                        <IoStorefront color='white' size="20px"/>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <p className='text-sidebar-penjual'>Profile Toko</p>
                    </div>
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