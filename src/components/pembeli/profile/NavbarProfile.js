import './navbarprofile.css'
import { Link } from 'react-router-dom';

const NavabarProfile = ({isEdit}) => {
            
    return (
        <div className="navbar-profile d-flex align-items-center justify-content-center">
            <div className="row " style={{ width:'95dvw', height:'100%'}}>
                <div className="col-2  d-flex justify-content-center align-items-center">
                    {!isEdit? <Link to={'/'} style={{ textDecoration:"none"}}>
                        <div className="but-kembali-profile  ">
                            <p className='text-kembali-profile d-flex justify-content-center align-items-center'>Kembali</p>
                        </div>
                    </Link> :
                        <div></div>
                    }
                    
                </div>

                <div className="col  ">
                    <p className='text-profile d-flex justify-content-center align-items-center'> Profile </p>
                </div>

                <div className="col-2"></div>
            </div>
        </div>
     );
}
 
export default NavabarProfile;