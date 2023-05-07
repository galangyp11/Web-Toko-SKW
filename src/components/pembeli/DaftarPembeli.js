import axios from 'axios'
import './daftarpembeli.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DaftarPembeli1 = () => {

    const navigate = useNavigate()
    const [dataInput, setDataInput] = useState({
        email: "",
        username: "",
        password: "",
        alamat: "",
        foto_profil: null,
        level: "Pembeli"
    })

    const handleInput = (e) =>{
        setDataInput((data) => ({...data, 
            [e.target.id] : e.target.value
        }))
    }
    
    const handleDaftarPembeli = async e =>{
        e.preventDefault()
        if(!dataInput.email){
            alert('di isi emailnya dulu bang')
            if(!dataInput.username){
                alert('di isi usernamenya dulu bang')
                if(!dataInput.password){
                    alert('bang passwordnya g boleh kosong')
                }else{
                    try {
                        await axios.post(`http://localhost:3311/pembeli`, dataInput);
                        alert('udh berhasil daftar bang');
                        navigate('/login');
                    } catch (error) {
                        console.log('eror bang gabisa input')
                    }
                }
            }
        }
        
    }

    console.log(dataInput)
    return ( 
        <div className="daftar-pembeli">
            <div className="daftar-pembeli-con container d-flex justify-content-center align-items-center">
                <div className="form-daftar-pembeli d-grid row d-flex justify-content-center">

                    <div className="form-head-pembeli my-0 d-flex justify-content-center row ">
                        <h2 className='text-registrasi d-flex justify-content-center align-items-center'>Registrasi</h2>
                    </div>

                    <div className="form-body-pembeli mb-2 d-flex justify-content-center row">
                        <div className="row d-flex justify-content-center">
                            <label htmlFor="email"  id='label-input'>Email</label>
                            <input
                                className='input-text'
                                type="text"
                                required
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
                                required
                                placeholder='Masukan password anda...'
                                id="password"
                                value={dataInput.password}
                                onChange={handleInput}
                            />  
                        </div>

                        <div className="row d-flex justify-content-center">
                            <label htmlFor="username"  id='label-input'>Username</label>
                            <input
                                className='input-text'
                                type="text"
                                required
                                placeholder='Masukan username anda...'
                                id="username"
                                value={dataInput.username}
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
                                <p className='text-but-next-daftar d-flex justify-content-center align-items-center' onClick={handleDaftarPembeli}>Daftar</p>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
     );
}
 
export default DaftarPembeli1;