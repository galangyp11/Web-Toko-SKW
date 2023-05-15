import './infopembeli.css'
import { BsArrowRepeat } from "react-icons/bs";

const InfoPembeli = ({pembeliById, foto, isEdit, setIsEdit, setIdPageEdit}) => {
    
    const handleUbah = async (e) => {
        setIsEdit(true);
        setIdPageEdit(e.target.id)
    }

    return ( 
        <div className="InfoPembeli">
            <div className="row my-3 border">
                    <div className="col-4 border d-flex justify-content-center">
                        <div className="bg-foto-profile">
                            <img className='foto-profile' src={ `data:image/png;base128,${foto}`} alt="" />
                        </div>
                    </div>

                    <div className="col p-5 border" >
                        <div className="row border">
                            <div className="col-2 border">
                                <p className='text-profile-bio d-flex align-items-center'>Username</p>
                            </div>
                            <div className="col-1 border">
                                <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                            </div>
                            <div className="col border">
                                <p className='text-profile-bio d-flex align-items-center'>{pembeliById.username}</p>
                            </div>
                            <div className="col-1 border d-flex justify-content-center align-items-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='username' onClick={handleUbah}/>
                            </div>
                        </div>

                        <div className="row border">
                            <div className="col-2 border">
                                <p className='text-profile-bio d-flex align-items-center'>Email</p>
                            </div>
                            <div className="col-1 border">
                                <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                            </div>
                            <div className="col border">
                                <p className='text-profile-bio d-flex align-items-center'>{pembeliById.email}</p>
                            </div>
                            <div className="col-1 border d-flex justify-content-center align-items-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='email' onClick={handleUbah}/>
                            </div>
                        </div>

                        <div className="row border">
                            <div className="col-2 border">
                                <p className='text-profile-bio d-flex align-items-center'>Password</p>
                            </div>
                            <div className="col-1 border">
                                <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                            </div>
                            <div className="col border">
                                <p className='text-profile-bio d-flex align-items-center'>{pembeliById.password}</p>
                            </div>
                            <div className="col-1 border d-flex justify-content-center align-items-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='password' onClick={handleUbah}/>
                            </div>
                        </div>

                        <div className="row border">
                            <div className="col-2 border">
                                <p className='text-profile-bio d-flex align-items-center'>Alamat</p>
                            </div>
                            <div className="col-1 border">
                                <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                            </div>
                            <div className="col border">
                                <p className='text-profile-bio-info d-flex align-items-center' style={{height:'100px'}}>{pembeliById.alamat}</p>
                            </div>
                            <div className="col-1 border d-flex justify-content-center align-items-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='alamat' onClick={handleUbah}/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
     );
}
 
export default InfoPembeli;