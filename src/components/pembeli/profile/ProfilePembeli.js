import './profilepembeli.css'
import { useState, useEffect } from 'react';
import NavbarProfile from './NavbarProfile';
import Cookies from 'js-cookie';
import axios from 'axios';

import fotoKosing from '../../image/pp-kosong.png';
import InfoPembeli from './InfoPembeli';
import HalamanEdit from '../edit/HalamanEdit';
import apiHost from '../../../constants/apiHost';

const ProfilePembeli = () => {

    const [pembeliById, setPembeliById] = useState({});
    const [foto, setFoto] = useState();
    const id = Cookies.get('id');

    const [isEdit, setIsEdit] = useState(false);
    const [idPageEdit, setIdPageEdit] = useState();

    useEffect(() => {
        const getItemById = async () => {
            const response = await axios.get(`${apiHost}pembeli/${id}`);
            setPembeliById(response.data);
            console.log(response.data);
        }
        getItemById();
    }, []);

    useEffect(() => {
        const fotoData = btoa(
            String.fromCharCode(...new Uint8Array(pembeliById.foto_profil?.data))
          );  

        setFoto(fotoData)
    },[pembeliById])

    console.log(isEdit)

    return ( 
        <div className="profilepembeli">
            <div className="sticky-top">
                <NavbarProfile isEdit={isEdit}/>
            </div>

            <div className="profilepembeli-con container">
                {!isEdit? <InfoPembeli pembeliById={pembeliById} foto={foto} isEdit={isEdit} setIsEdit={setIsEdit} setIdPageEdit={setIdPageEdit}/> : 
                <HalamanEdit pembeliById={pembeliById} foto={foto} setIsEdit={setIsEdit} idPageEdit={idPageEdit}/>}
            </div>
        </div>
     );
}
 
export default ProfilePembeli;