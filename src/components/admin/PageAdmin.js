import './pageadmin.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios';
import HomeAdmin from './HomeAdmin';
import apiHost from '../../constants/apiHost';

const PageAdmin = ({dataLogin}) => {

    const navigate = useNavigate();
    const [page, setPage] = useState();
    const [dataAdmin, setDataAdmin] = useState([]);
    const [dataKonfirmasi, setDataKonfirmasi] = useState([]);

    useEffect(()=>{
        const getAdmin = async () => {
            const response = await axios.get(`${apiHost}admin`)
            setDataAdmin(response.data)
        }
        getAdmin()
    },[])

    useEffect(()=>{
        const getNotif = async () => {
            const response = await axios.get(`${apiHost}transaksi`)
            setDataKonfirmasi(response.data)
        }
        getNotif()
    },[setDataKonfirmasi])

    useEffect(()=>{
        setPage(<HomeAdmin dataAdmin={dataAdmin}/>)
    },[])

    console.log(page)
    return ( 
        <div className="page-admin">
            <div className="sticky-top">
                <NavbarAdmin/>
            </div>

            <div className="row container-fluid" style={{width:"100%", height:"100%"}}>
                <div className="col-2 p-0">
                    <SidebarAdmin setPage={setPage} dataKonfirmasi={dataKonfirmasi}/>
                </div>

                <div className="col container-fluid">
                      <div className="page-menu">
                        {page}
                      </div>
                </div>
            </div>
        </div>
     );
}
 
export default PageAdmin;