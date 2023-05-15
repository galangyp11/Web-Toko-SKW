import './sidebaradmin.css'
import { IoStorefront } from 'react-icons/io5'
import { BiCollection } from 'react-icons/bi'
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { AiFillApple } from "react-icons/ai";

import ProfilPenjualAdmin from './ProfilPenjualAdmin';
import ProfilPembeliAdmin from './ProfilPembeliAdmin';
import TransaksiPembeliAdmin from './TransaksiPembeliAdmin';
import SemuaItemAdmin from './SemuaItemAdmin';
import PemasukanItemAdmin from './PemasukanItemAdmin';
import PengeluaranItemAdmin from './PengeluaranItemAdmin';

import { useState } from 'react'

const Sidebaradmin = ({setPage}) => {
    const [openPembeli, setOpenPembeli] = useState(false);
    const [openPenjual, setOpenPenjual] = useState(false);
    const [openItem, setOpenItem] = useState(false);

    const handlePenjual = () => {
        setPage(<ProfilPenjualAdmin/>)
    }

    const handleProfilPembeli = () => {
        setPage(<ProfilPembeliAdmin/>)
    }

    const handleTransaksiPembeli = () => {
        setPage(<TransaksiPembeliAdmin/>)
    }

    const handleSemuaItem = () => {
        setPage(<SemuaItemAdmin/>)
    }

    const handlePemasukanItem = () => {
        setPage(<PemasukanItemAdmin/>)
    }

    const handlePengeluaranItem = () => {
        setPage(<PengeluaranItemAdmin/>)
    }
    return ( 
        <div className="sidebar-admin pt-4">
            <div className={openPenjual ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title" onClick={() => setOpenPenjual(!openPenjual)}>
                       <p className='text-sidebar-admin-title d-flex align-items-center' id='text-sidebar-admin'> <AiFillApple className='icon-title'/>Penjual </p>
                       <IoArrowForwardCircleOutline size="40px" color='white' className='toggle-btn d-flex justify-content-end '/>
                </div>
                <div className="sidebar-content ">
                    <p className='text-sidebar-admin-content d-flex align-items-center px-3' id='text-sidebar-admin' onClick={handlePenjual}>Profile</p>
                </div>
            </div>

            <div className={openPembeli ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title" onClick={() => setOpenPembeli(!openPembeli)}>
                       <p className='text-sidebar-admin-title d-flex align-items-center' id='text-sidebar-admin'> <AiFillApple className='icon-title'/>Pembeli </p>
                       <IoArrowForwardCircleOutline size="40px" color='white' className='toggle-btn d-flex justify-content-end ' />
                </div>
                <div className="sidebar-content ">
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={handleProfilPembeli}>Profil Pembeli</p>
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={handleTransaksiPembeli}>Transaksi Pembeli</p>                
                </div>
            </div>

            <div className={openItem ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title "  onClick={() => setOpenItem(!openItem)}>
                    <p className='text-sidebar-admin-title  d-flex align-items-center' id='text-sidebar-admin'>
                        <AiFillApple className='icon-title'/>Item </p>
                    <IoArrowForwardCircleOutline size="40px" color='white' className='toggle-btn d-flex justify-content-end '/>
                </div>

                <div className="sidebar-content ">
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={handleSemuaItem}>Semua Item</p>
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={handlePemasukanItem}>Pemasukan Item</p>
                    <p className='text-sidebar-admin-content px-3 d-flex align-items-center' id='text-sidebar-admin' onClick={handlePengeluaranItem}>Pengeluaran Item</p>
                </div>
            </div>

        </div>
     );
}
 
export default Sidebaradmin;