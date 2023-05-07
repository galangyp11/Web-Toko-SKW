import './pagepenjual.css'
import { useNavigate } from 'react-router-dom';
import NavabarPenjual from './NavbarPenjual';
import SidebarPenjual from './SidebarPenjual';

const PagePenjual = () => {

    const navigate = useNavigate();

    return ( 
        <div className="page-penjual">
            <div className="sticky-top">
                <NavabarPenjual/>
            </div>

            <div className="row border" style={{width:"100%", height:"100%"}}>
                <div className="col-2 p-0 border" style={{height:"100%", minHeight:"92dvh", }}>
                    <SidebarPenjual/>
                </div>

                <div className="col container-fluid border">
                      
                </div>
            </div>
        </div>
     );
}
 
export default PagePenjual;