import './pagepembeli.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {

    const [pembeliById, setPembeliById] = useState({});
    const [foto, setFoto] = useState()
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getItemById = async () => {
            const response = await axios.get(`http://localhost:3311/pembeli/${id}`);
            setPembeliById(response.data);
            console.log(response.data);
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

    console.log(pembeliById.username)

    return ( 
        <div className="page-pembeli d-flex justify-content-center align-items-center">
            <div className="uwoh p-5">
                <h3>Halo, {pembeliById.username}</h3>
                <img className='pembeli-image' src={`data:image/png;base64,${foto}`} alt=""/>

                <div className="butlogout d-flex justify-content-end align-items-center">
                    <button className='btn btn-danger ' onClick={()=>{navigate('/')}}>Logout</button>
                </div>
            </div>
        </div>
     );
}
 
export default User;