import './sidebaradmin.css'
import { IoStorefront } from 'react-icons/io5'
import { BiCollection } from 'react-icons/bi'

const Sidebaradmin = () => {

    return ( 
        <div className="sidebar-admin p-4 ">
            <div className="d-grid gap-3 px-2">
                <div className="row bg-menu-sidebar">
                    <div className="col d-flex justify-content-center align-items-center">
                        <p className='text-sidebar-admin'>Profile Toko</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Sidebaradmin;