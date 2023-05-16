import EditUsername from './EditUsername';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import EditAlamat from './EditAlamat';
import EditFotoPembeli from './EditFotoPembeli';
import { useEffect, useState } from 'react';

const HalamanEdit = ({pembeliById, foto, setIsEdit, idPageEdit}) => {

    const [page, setPage] = useState();

    useEffect(()=>{
        if(idPageEdit === 'username'){
           setPage(<EditUsername pembeliById={pembeliById} foto={foto} setIsEdit={setIsEdit}/>) 
        } else  if(idPageEdit === 'email'){
            setPage(<EditEmail pembeliById={pembeliById} foto={foto} setIsEdit={setIsEdit}/>) 
         } else  if(idPageEdit === 'password'){
            setPage(<EditPassword pembeliById={pembeliById} foto={foto} setIsEdit={setIsEdit}/>) 
         } else  if(idPageEdit === 'alamat'){
            setPage(<EditAlamat pembeliById={pembeliById} foto={foto} setIsEdit={setIsEdit}/>) 
         } else  if(idPageEdit === 'foto_pembeli'){
            setPage(<EditFotoPembeli pembeliById={pembeliById} foto={foto} setIsEdit={setIsEdit}/>) 
         }else {
            setPage(null)
        }
    },[])

    console.log(idPageEdit)
    return ( 
        <div className="halaman-edit">
            {page}
        </div>
     );
}
 
export default HalamanEdit;