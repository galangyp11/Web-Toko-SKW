import './pagepenjual.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiHost from '../../constants/apiHost';
import axios from 'axios';
import Cookies from 'js-cookie';

import NavbarPenjual from './NavbarPenjual';
import SidebarPenjual from './SidebarPenjual';
import ProfileToko from './page/ProfileToko';

const PagePenjual = () => {

    const navigate = useNavigate();
    const [page, setPage] = useState();
    const [dataPenjual, setDataPenjual] = useState([]);
    const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
    const id = Cookies.get('id')

    useEffect(()=>{
        const getPenjual = async () => {
            const response = await axios.get(`${apiHost}penjual/${id}`)
            setDataPenjual(response.data)
        }
        getPenjual()
    },[])

    useEffect(()=>{
        const getNotif = async () => {
            const response = await axios.get(`${apiHost}transaksi/penjual/${id}`)
            setDataKonfirmasi(response.data)
        }
        getNotif()
    },[dataKonfirmasi])

    useEffect(()=>{
        setPage(<ProfileToko dataPenjual={dataPenjual}/>)
    },[])

    return ( 
        <div className="page-penjual">
            <div className="row" style={{width:"100%", height:"100dvh"}}>
                <div className="col-2 p-0 sticky-top" style={{height:"100%" }}>
                    <SidebarPenjual setPage={setPage} dataKonfirmasi={dataKonfirmasi}/>
                </div>

                <div className="col container py-3">
                    <div className="page-menu d-flex justify-content-center">
                        {page}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PagePenjual;