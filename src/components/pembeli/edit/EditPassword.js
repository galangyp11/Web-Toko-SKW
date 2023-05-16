import './halamanedit.css'
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EditPembeli = ({foto, setIsEdit, pembeliById}) => {

    const id = Cookies.get('id')
    const [dataInput, setDataInput] = useState({
        id_pembeli: '',
        value: '',
        dataRecord: '',
    });

    const handleInput = (e) =>{
        setDataInput((data) => ({...data,
            value : e.target.id,
            dataRecord : e.target.value
        }))
    };

    useEffect(()=>{
        setDataInput((data)=> ({...data,
            id_pembeli : id
        }))
    }, [])

    const handleSimpan = async (e) => {
        e.preventDefault()
        try {   
            await axios.put(`http://localhost:3311/pembeli`, dataInput);
            alert('udh berhasil daftar bang');
            setIsEdit(false);
            window.location.reload()
        } catch (error) {
            console.log('eror bang gabisa input')
        }
    }

    console.log(dataInput)

    return ( 
        <div className="edit-pembeli">
            <div className="row my-3 border">
                <div className="col-4 border d-flex justify-content-center">
                        <div className="bg-foto-profile">
                            <img className='foto-profile' src={ `data:image/png;base128,${foto}`} alt="" />
                        </div>
                    </div>

                    <div className="col p-5 border" >
                        <div className="row border">
                            <div className="col-2 border">
                                <p className='text-profile-bio d-flex align-items-center'>Password</p>
                            </div>
                            <div className="col-1 border">
                                <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                            </div>
                            <div className="col border d-flex align-items-center">
                                <input 
                                    className='text-profile-edit d-flex align-items-center' 
                                    id="password"
                                    placeholder={pembeliById.password}
                                    value={dataInput.dataRecord} 
                                    onChange={handleInput}>
                                </input>
                            </div>
                            {/* <div className="col-1 border d-flex justify-content-center align-items-center">
                                <BsArrowRepeat className="icon-ubah" size="1.5em" id='username' onClick={handleUbah}/>
                            </div> */}
                        </div>                   

                    <div className="col-2 border d-flex justify-content-start align-items-center">
                        <div className="row border d-flex justify-content-end align-items-end g-3">
                            <div className="col">
                                <div className="but-simpan-profile ">
                                    <p className="text-simpan-profile d-flex justify-content-center align-items-center" onClick={()=>{setIsEdit(false)}}>Batal</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="but-simpan-profile ">
                                    <p className="text-simpan-profile d-flex justify-content-center align-items-center" onClick={handleSimpan}>Simpan</p>
                                </div>
                            </div>            
                        </div>
                    </div>                          
              </div>
            </div>
        </div>
     );
}
 
export default EditPembeli;