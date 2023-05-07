import axios from 'axios'
import './daftarpenjual.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DaftarPembeli1 = () => {

    const navigate = useNavigate()
    const [dataInput, setDataInput] = useState({
        email: "",
        nama_toko: "",
        logo_toko: "",
        password: "",
        id_item: null,
        alamat: "",
        whatsapp: "",
        no_rek_penjual: "",
        level: "Penjual"
    })

    const handleInput = (e) =>{
        setDataInput((data) => ({...data, 
            [e.target.id] : e.target.value
        }))
    }
    
    const handleDaftarPenjual = async e =>{
        e.preventDefault()
        try {   
            await axios.post(`http://localhost:3311/penjual`, dataInput);
            // alert('udh berhasil daftar bang');
            // navigate('/login');
        } catch (error) {
            console.log('eror bang gabisa input')
        }
    }

    console.log(dataInput)
    return ( 
        <div className="daftar-pembeli">
            <div className="daftar-pembeli-con container d-flex justify-content-center align-items-center">
                <div className="form-daftar-pembeli d-grid row d-flex justify-content-center">

                    <div className="form-head-pembeli my-0 d-flex justify-content-center row ">
                        <h2 className='text-registrasi d-flex justify-content-center align-items-center'>Registrasi <br /> Penjual</h2>
                    </div>

                    <div className="form-body-pembeli mb-2 d-flex justify-content-center row">
                        <div className="row d-flex justify-content-center">
                            <label htmlFor="email"  id='label-input'>Email</label>
                            <input
                                className='input-text'
                                type="text"
                                placeholder='Masukan email anda...'
                                id="email"
                                value={dataInput.email}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="row d-flex justify-content-center">
                            <label htmlFor="password" id='label-input'>Password</label>
                            <input 
                                className='input-text'
                                type="password" 
                                placeholder='Masukan password anda...'
                                id="password"
                                value={dataInput.password}
                                onChange={handleInput}
                            />  
                        </div>

                        <div className="row d-flex justify-content-center">
                            <label htmlFor="nama_toko"  id='label-input'>Nama Toko</label>
                            <input
                                className='input-text'
                                type="text"
                                placeholder='Toko...'
                                id="nama_toko"
                                value={dataInput.nama_toko}
                                onChange={handleInput}
                            />
                        </div>

                    </div>

                    <div className="form-footer-pembeli my-2 row d-flex justify-content-center align-items-end">
                        <div className="col d-flex justify-content-start">
                            <div className="but-beranda-daftar">
                                <p className='text-but-beranda-daftar d-flex justify-content-center align-items-center' onClick={()=>navigate('/')}>Beranda</p>
                            </div>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <div className="but-next-daftar">
                                <p className='text-but-next-daftar d-flex justify-content-center align-items-center' onClick={handleDaftarPenjual}>Daftar</p>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
     );
}
 
export default DaftarPembeli1;