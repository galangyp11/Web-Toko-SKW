import './pageadmin.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';

const PageAdmin = ({dataLogin}) => {

    const navigate = useNavigate();
    const [page, setPage] = useState();


    return ( 
        <div className="page-admin">
             <div className="sticky-top">
                <NavbarAdmin/>
            </div>

            <div className="row container-fluid" style={{width:"100%", height:"100%"}}>
                <div className="col-2 p-0">
                    <SidebarAdmin setPage={setPage}/>
                </div>

                <div className="col container-fluid">
                      <div className="page-menu">
                        {page}
                      </div>
                </div>
            </div>
        </div>
     );
}
 
export default PageAdmin;