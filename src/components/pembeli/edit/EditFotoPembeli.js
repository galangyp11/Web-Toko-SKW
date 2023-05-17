import './halamanedit.css'
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const EditFotoPembeli = ({foto, setIsEdit, pembeliById}) => {

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
            <div className="row my-3">
                <div className="col p-5" >
                <p className="text-edit-pembeli">Edit Foto Profil</p>
                <hr />
                    <div className="row">
                        <div className="col-4">
                            <div className="bg-foto-profile-pembeli">
                                <img className='foto-profile' src={ `data:image/png;base64,${foto}`} alt="" />
                            </div>
                        </div>

                        <div className="col d-flex align-items-center">
                            <input 
                                className='edit-profile-file d-flex align-items-center' 
                                type='file'
                                value={dataInput.dataRecord} 
                                onChange={handleInput}>
                            </input>
                        </div>
                    </div>                   

                    
                    <div className="row mt-5">
                        <div className="col d-flex justify-content-start">
                            <button className="but-batal-profile" onClick={()=>{setIsEdit(false)}}>Batal</button>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <button className="but-simpan-profile" onClick={handleSimpan}>Simpan</button>
                        </div>            
                    </div>
                                  
              </div>
            </div>
        </div>
     );
}
 
export default EditFotoPembeli;