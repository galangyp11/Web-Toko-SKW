import './sidebaradmin.css'
import { IoStorefront } from 'react-icons/io5'
import { BiCollection } from 'react-icons/bi'
import { BsFillCaretRightFill } from "react-icons/bs";
import { BsExclamationCircleFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { AiFillApple } from "react-icons/ai";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import ProfilPenjualAdmin from './penjual/ProfilPenjualAdmin';
import ProfilPembeliAdmin from './pembeli/ProfilPembeliAdmin';
import TransaksiPembeliAdmin from './pembeli/TransaksiPembeliAdmin';
import SemuaItemAdmin from './item/SemuaItemAdmin';
import PemasukanItemAdmin from './item/PemasukanItemAdmin';
import PengeluaranItemAdmin from './item/PengeluaranItemAdmin';
import NotifPesanan from './NotifPesanan';

import { useState } from 'react'

const Sidebaradmin = ({setPage, dataKonfirmasi}) => {
    const [openPembeli, setOpenPembeli] = useState(false);
    const [openPenjual, setOpenPenjual] = useState(false);
    const [openItem, setOpenItem] = useState(false);

    let navigate = useNavigate();

    const handleOpenPembeli = () => {
        setOpenPembeli(!openPembeli)
        setOpenPenjual(false)
        setOpenItem(false)
    }

    const handleOpenPenjual = () => {
        setOpenPembeli(false)
        setOpenPenjual(!openPenjual)
        setOpenItem(false)
    }

    const handleOpenItem = () => {
        setOpenPembeli(false)
        setOpenPenjual(false)
        setOpenItem(!openItem)
    }

    const handleLogout = () => {
        Cookies.remove('id')
        setTimeout(()=>{
            navigate('/')
        }, 100)
    };
    return ( 
        <div className="sidebar-admin pt-4 px-3">
             <div className="logo-skw-sidebar pt-1 px-2 mx-3 d-flex">
                <p className='text-logo-skw-admin d-flex align-items-center' onClick={()=>navigate('/admin')}>SKW</p>
                <p className='text-skw-penjual d-flex align-items-center'>ADMIN</p>
            </div>

            <hr />

            <div className={openPenjual ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title d-flex align-items-center" onClick={handleOpenPenjual}>
                    <IoStorefront className='icon-title' color='white' size="40px"/>
                    <p className='text-sidebar-admin-title pt-3' id='text-sidebar-admin'>Penjual </p>
                    <BsFillCaretRightFill size="25px" color='white' className='toggle-btn d-flex justify-content-end'/>
                </div>
                <div className="sidebar-content ">
                    <p className='text-sidebar-admin-content d-flex align-items-center px-3' id='text-sidebar-admin' onClick={()=> setPage(<ProfilPenjualAdmin/>)}>Profile Penjual</p>
                </div>
            </div>

            <div className={openPembeli ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title d-flex align-items-center" onClick={handleOpenPembeli}>
                    <BsPersonFill className='icon-title' color='white' size="40px"/>
                    <p className='text-sidebar-admin-title pt-3' id='text-sidebar-admin'>Pembeli </p>
                    <BsFillCaretRightFill size="25px" color='white' className='toggle-btn d-flex justify-content-end ' />
                </div>
                <div className="sidebar-content ">
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={()=> setPage(<ProfilPembeliAdmin/>)}>Profile Pembeli</p>
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={()=> setPage(<TransaksiPembeliAdmin/>)}>Riwayat Transaksi</p>                
                </div>
            </div>

            <div className={openItem ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title d-flex align-items-center"  onClick={handleOpenItem}>
                    <BiCollection className='icon-title' color='white' size="40px"/>
                    <p className='text-sidebar-admin-title  pt-3' id='text-sidebar-admin'>Item </p>
                    <BsFillCaretRightFill size="25px" color='white' className='toggle-btn d-flex justify-content-end '/>
                </div>

                <div className="sidebar-content ">
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={()=> setPage(<SemuaItemAdmin/>)}>Semua Item</p>
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={()=> setPage(<PemasukanItemAdmin/>)}>Pemasukan Item</p>
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={()=> setPage(<PengeluaranItemAdmin/>)}>Pengeluaran Item</p>
                </div>
            </div>

            <div className="sidebar-item">
                <div className="sidebar-title d-flex align-items-center">
                    <p className="text-sidebar-admin-title pt-3" id='text-sidebar-admin' onClick={()=> setPage(<NotifPesanan/>)}>Pesanan Masuk</p>
                    <div className="bg-text-notif-pesanan d-flex justify-content-center">
                        <p className="text-notif-pesanan">{dataKonfirmasi.length}</p>
                    </div>
                </div>
            </div>

            <div className="my-5 d-flex justify-content-center">
                <button className='but-logout-admin' onClick={handleLogout}>Logout</button>
            </div>

        </div>
     );
}
 
export default Sidebaradmin;