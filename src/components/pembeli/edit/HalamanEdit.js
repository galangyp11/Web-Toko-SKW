import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import apiHost from '../../../constants/apiHost';
import Alert from '../../AlertHijau';

const HalamanEdit = ({ setIsEdit}) => {

   const [pembeliById, setPembeliById] = useState({});
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
   const [isAlert, setIsAlert] = useState(false)
   const [textAlert, setTextAlert] = useState('')

   useEffect(() => {
       const getItemById = async () => {
         const response = await axios.get(`${apiHost}pembeli/${id}`);
         setPembeliById(response.data);
       }
       getItemById();
               
   }, []);

   setTimeout(()=>{
       try {
           setFoto(btoa(String.fromCharCode(...new Uint8Array(pembeliById.foto_profil.data))))
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
           id_pembeli : id,
           email : pembeliById.email,
           password : pembeliById.password,
           alamat : pembeliById.alamat,
           username : pembeliById.username
       }))
   }, [pembeliById])

   const handleSimpanPenjual = async(e) => {
      e.preventDefault()
      await axios.put(`${apiHost}pembeli`, dataInput);
      setIsAlert(true)
      setTextAlert('Profile berhasil diubah')
      window.location.reload()

   }
    return ( 
      <div className="info-pembeli py-5 px-3 my-3">
      <div className="row my-3">
              <div className="col-5 d-flex justify-content-center">
                  <div className="bg-foto-profile-pembeli">
                      <img className='foto-profile' src={ `data:image/png;base64,${foto}`} alt="" />
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
                        <input 
                           className='text-profile-bio-data d-flex align-items-center'
                           placeholder={pembeliById.username}
                           id='username'
                           onChange={handleInput}
                        ></input>
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
                        <input 
                           className='text-profile-bio-data d-flex align-items-center'
                           placeholder={pembeliById.email}
                           id='email'
                           onChange={handleInput}
                        ></input>
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
                        <input 
                           className='text-profile-bio-data d-flex align-items-center'
                           placeholder={pembeliById.password}
                           id='password'
                           onChange={handleInput}
                        ></input>
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
                        <input 
                           className='text-profile-bio-data d-flex align-items-center'
                           placeholder={pembeliById.alamat}
                           id='alamat'
                           onChange={handleInput}
                        ></input>
                      </div>
                    
                  </div>
                  <hr/>
              </div>
          </div>
          <div className="row ">
                        <div className="col d-flex justify-content-end">
                            <button className='btn btn-outline-danger but-tolak-pesanan' onClick={()=>setIsEdit(false)}>Batal</button>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                            <button className='but-input-item-penjual' onClick={handleSimpanPenjual}>Simpan</button>
                        </div>
                    </div>
            <div className="d-flex justify-content-center">
               {isAlert ? <Alert textAlert={textAlert} isAlert={isAlert} setIsAlert={setIsAlert} setIsEdit={setIsEdit}/> : <div></div>}
            </div>
      </div>
     );
}
 
export default HalamanEdit;