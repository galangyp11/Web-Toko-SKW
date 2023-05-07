import './pageadmin.css'
import { useNavigate } from 'react-router-dom';

import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';

const PageAdmin = ({dataLogin}) => {

    const navigate = useNavigate();

    return ( 
        <div className="page-admin">
             <div className="sticky-top">
                <NavbarAdmin/>
            </div>

            <div className="row border" style={{width:"100%", height:"100%"}}>
                <div className="col-2 p-0 border" style={{height:"100%", minHeight:"92dvh", }}>
                    <SidebarAdmin/>
                </div>

                <div className="col container-fluid border">
                      
                </div>
            </div>
        </div>
     );
}
 
export default PageAdmin;