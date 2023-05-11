import './pagepenjual.css'
import { useNavigate } from 'react-router-dom';


import NavabarPenjual from './NavbarPenjual';
import SidebarPenjual from './SidebarPenjual';
import InputItem from './InputItem';

const PagePenjual = () => {

    const navigate = useNavigate();

    return ( 
        <div className="page-penjual">
            <div className="row" style={{width:"100%", height:"100dvh"}}>
                <div className="col-2 p-0" style={{height:"100%" }}>
                    <SidebarPenjual/>
                </div>

                <div className="col container-fluid">
                    <InputItem/>
                </div>
            </div>
        </div>
     );
}
 
export default PagePenjual;