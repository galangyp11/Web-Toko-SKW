import './infopembeli.css'
import { BsArrowRepeat } from "react-icons/bs";

const InfoPembeli = ({pembeliById, foto, isEdit, setIsEdit, setIdPageEdit}) => {
    
    const handleUbah = async (e) => {
        setIsEdit(true);
        setIdPageEdit(e.target.id)
    }

    return ( 
        <div className="info-pembeli py-5 px-3">
            <div className="row my-3">
                    <div className="col-5 d-flex justify-content-center">
                        <div className="bg-foto-profile-pembeli">
                            <img className='foto-profile' src={ `data:image/png;base64,${foto}`} alt="" />
                        </div>
                        <div className="col-1 d-flex justify-content-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='foto_pembeli' onClick={handleUbah}/>
                        </div>
                    </div>

                    <div className="col" >
                        <div className="row">
                            <div className="col-2">
                                <p className='text-profile-bio d-flex align-items-center'>Username</p>
                            </div>
                            <div className="col-1">
                                <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                            </div>
                            <div className="col">
                                <p className='text-profile-bio-data d-flex align-items-center'>{pembeliById.username}</p>
                            </div>
                            <div className="col-1 d-flex justify-content-center align-items-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='username' onClick={handleUbah}/>
                            </div>
                        </div>
                        <hr/>

                        <div className="row">
                            <div className="col-2">
                                <p className='text-profile-bio d-flex align-items-center'>Email</p>
                            </div>
                            <div className="col-1">
                                <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                            </div>
                            <div className="col">
                                <p className='text-profile-bio-data d-flex align-items-center'>{pembeliById.email}</p>
                            </div>
                            <div className="col-1 d-flex justify-content-center align-items-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='email' onClick={handleUbah}/>
                            </div>
                        </div>
                        <hr/>

                        <div className="row">
                            <div className="col-2">
                                <p className='text-profile-bio d-flex align-items-center'>Password</p>
                            </div>
                            <div className="col-1">
                                <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                            </div>
                            <div className="col">
                                <p className='text-profile-bio-data d-flex align-items-center'>{pembeliById.password}</p>
                            </div>
                            <div className="col-1 d-flex justify-content-center align-items-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='password' onClick={handleUbah}/>
                            </div>
                        </div>
                        <hr/>

                        <div className="row">
                            <div className="col-2">
                                <p className='text-profile-bio d-flex align-items-center'>Alamat</p>
                            </div>
                            <div className="col-1">
                                <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                            </div>
                            <div className="col">
                                <p className='text-profile-bio-alamat d-flex align-items-end'>{pembeliById.alamat}</p>
                            </div>
                            <div className="col-1 d-flex justify-content-center align-items-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='alamat' onClick={handleUbah}/>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
        </div>
     );
}
 
export default InfoPembeli;