import './udhlogin.css'
import { useNavigate } from 'react-router-dom';


const PagePenjual = () => {

    const navigate = useNavigate();

    return ( 
        <div className="page-penjual d-flex justify-content-center align-items-center" style={{ height:"100dvh", width:"100dvw", backgroundColor:"#ff6d60"}}>
            <div className="uwoh p-5">
               
                <div className="butlogout d-flex justify-content-end align-items-end">
                    <button className='btn btn-danger ' onClick={()=>{navigate('/')}}>Logout</button>
                </div>
            </div>
        </div>
     );
}
 
export default PagePenjual;