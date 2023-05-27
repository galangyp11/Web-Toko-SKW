import './profiletoko.css'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import ProfileToko from './ProfileToko';
import apiHost from '../../../constants/apiHost'

const EditProfileToko = ({setIsEdit}) => {

    const [penjualById, setPenjualById] = useState({});
    const [foto, setFoto] = useState()
    const id = Cookies.get('id')
    const [dataInput, setDataInput] = useState({
        id_penjual : '',
        nama_toko : '',
        email : '',
        password : '',
        alamat : '',
        whatsapp : '',
        no_rek_penjual : ''
    })

    useEffect(() => {
        const getItemById = async () => {
            const response = await axios.get(`${apiHost}penjual/${id}`);
            setPenjualById(response.data);
            console.log(response.data);
        }
        getItemById();
                
    }, []);

    setTimeout(()=>{
        try {
            setFoto(btoa(String.fromCharCode(...new Uint8Array(penjualById.foto_profil.data))))
        } catch (error) {
            console.log('sabar bang fotonya lagi loading')
        }
    }, 100)

    const handleInput = (e) => {
        setDataInput((data) => ({...data,
            [e.target.id] : e.target.value
        }))
    }

    useEffect(()=>{
        setDataInput((data)=> ({...data,
            id_penjual : id,
            nama_toko : penjualById.nama_toko,
            email : penjualById.email,
            password : penjualById.password,
            alamat : penjualById.alamat,
            whatsapp : penjualById.whatsapp,
            no_rek_penjual : penjualById.no_rek_penjual
        }))
    }, [penjualById])

    const handleSimpanPenjual = async(e) => {
        e.preventDefault()
        await axios.put(`${apiHost}penjual`, dataInput);
        alert('Berhasil diubah bang');
        window.location.reload()
        setIsEdit(false);
    }

    console.log(dataInput)

    return ( 
        <div className="edit-profile-toko">
            <div className="row profile-toko container p-4  d-flex justify-content-center">
                <div className="col-3 ">
                    <div className="bg-foto-profile-penjual">
                        <img className='foto-profile' src={ `data:image/png;base64,${foto}`} alt="" />
                    </div>
                </div>

                <div className="col p-5 " >
                    <input type="file" />
                </div>
                
                <div className="row ">
                        <div className="col-2 ">
                            <p className='text-profile-bio d-flex align-items-center'>Toko</p>
                        </div>

                        <div className="col-1 ">
                            <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                        </div>

                        <div className="col ">
                            <input 
                                className='text-profile-bio d-flex align-items-center' 
                                placeholder={penjualById.nama_toko}
                                id='nama_toko'
                                // value={dataInput.nama_toko} 
                                onChange={handleInput}
                            ></input>
                        </div>
                    </div>
                    
                    <hr />
                    <div className="row ">
                        <div className="col-2 ">
                            <p className='text-profile-bio d-flex align-items-center'>Email</p>
                        </div>

                        <div className="col-1 ">
                            <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                        </div>

                        <div className="col ">
                            <input 
                                className='text-profile-bio d-flex align-items-center' 
                                placeholder={penjualById.email}
                                id='email'
                                // value={dataInput.email} 
                                onChange={handleInput}
                                ></input>
                        </div>
                    </div>
                    <hr />

                    <div className="row ">
                        <div className="col-2 ">
                            <p className='text-profile-bio d-flex align-items-center'>Password</p>
                        </div>

                        <div className="col-1 ">
                            <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                        </div>

                        <div className="col ">
                            <input 
                                className='text-profile-bio d-flex align-items-center' 
                                placeholder={penjualById.password}
                                id='password'
                                // value={dataInput.password} 
                                onChange={handleInput}
                                ></input>
                        </div>
                    </div>
                    <hr />

                    <div className="row ">
                        <div className="col-2 ">
                            <p className='text-profile-bio d-flex align-items-center'>Alamat</p>
                        </div>

                        <div className="col-1 ">
                            <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                        </div>

                        <div className="col ">
                            <input 
                                className='text-profile-bio d-flex align-items-center' 
                                placeholder={penjualById.alamat}
                                id='alamat'
                                // value={dataInput.alamat} 
                                onChange={handleInput}
                                ></input>
                        </div>
                    </div>
                    <hr />

                    <div className="row ">
                        <div className="col-2 ">
                            <p className='text-profile-bio d-flex align-items-center'>Whatsapp</p>
                        </div>

                        <div className="col-1 ">
                            <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                        </div>

                        <div className="col ">
                            <input 
                                className='text-profile-bio d-flex align-items-center' 
                                placeholder={penjualById.whatsapp}
                                id='whatsapp'
                                // value={dataInput.whatsapp} 
                                onChange={handleInput}
                                ></input>
                        </div>
                    </div>
                    <hr />

                    <div className="row ">
                        <div className="col-2 ">
                            <p className='text-profile-bio d-flex align-items-center'>No. Rekening</p>
                        </div>

                        <div className="col-1 ">
                            <p className='text-profile-bio d-flex justify-content-center align-items-center'>:</p>
                        </div>

                        <div className="col ">
                            <input 
                                className='text-profile-bio d-flex align-items-center' 
                                placeholder={penjualById.no_rek_penjual}
                                id='no_rek_penjual'
                                // value={dataInput.no_rek_penjual} 
                                onChange={handleInput}
                                ></input>
                        </div>
                    </div>
                    <hr />

                    <div className="row ">
                        <div className="col d-flex justify-content-end">
                            <button className='btn btn-outline-danger but-tolak-pesanan' onClick={()=>setIsEdit(false)}>Batal</button>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                            <button className='but-input-item-penjual' onClick={handleSimpanPenjual}>Simpan</button>
                        </div>
                    </div>
            </div>
        </div>
     );
}
 
export default EditProfileToko;