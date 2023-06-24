import './sidebaradmin.css'
import { IoStorefront } from 'react-icons/io5'
import { BiCollection } from 'react-icons/bi';
import { BsPersonFill, BsFillFilePersonFill, BsFillCaretRightFill } from "react-icons/bs";
import { AiFillApple } from "react-icons/ai";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import HomeAdmin from './HomeAdmin';
import ProfilPenjualAdmin from './penjual/ProfilPenjualAdmin';
import ProfilPembeliAdmin from './pembeli/ProfilPembeliAdmin';
import TransaksiPembeliAdmin from './pembeli/TransaksiPembeliAdmin';
import SemuaItemAdmin from './item/SemuaItemAdmin';
import KategoriItem from './item/KategoriItem';
import PemasukanItemAdmin from './item/PemasukanItemAdmin';
import PengeluaranItemAdmin from './item/PengeluaranItemAdmin';
import NotifPesanan from './NotifPesanan';

import { useState } from 'react'

const Sidebaradmin = ({setPage, dataKonfirmasi}) => {
    const [openPembeli, setOpenPembeli] = useState(false);
    const [openPenjual, setOpenPenjual] = useState(false);
    const [openItem, setOpenItem] = useState(false);
    const [isActiveProfilePenjual, setIsActiveProfilePenjual] = useState(false);
    const [isActiveProfilePembeli, setIsActiveProfilePembeli] = useState(false);
    const [isActiveTransaksiPembeli, setIsActiveTransaksiPembeli] = useState(false);
    const [isActiveSemuaItem, setIsActiveSemuaItem] = useState(false);
    const [isActiveKategoriItem, setIsActiveKategoriItem] = useState(false);
    const [isActiveRiwayatMasuk, setIsActiveRiwayatMasuk] = useState(false);
    const [isActiveRiwayatKeluar, setIsActiveRiwayatKeluar] = useState(false);

    let navigate = useNavigate();

    const handleOpenAdmin = () => {
        setOpenPembeli(false)
        setOpenPenjual(false)
        setOpenItem(false)
        setIsActiveProfilePenjual(false)
        setIsActiveSemuaItem(false)
        setIsActiveKategoriItem(false)
        setIsActiveRiwayatMasuk(false)
        setIsActiveRiwayatKeluar(false)
        setIsActiveProfilePembeli(false)
        setIsActiveTransaksiPembeli(false)
        setPage(<HomeAdmin/>)
    }

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

    const handleProfilPenjual = () => {
        setIsActiveProfilePenjual(true)
        setIsActiveSemuaItem(false)
        setIsActiveKategoriItem(false)
        setIsActiveRiwayatMasuk(false)
        setIsActiveRiwayatKeluar(false)
        setIsActiveProfilePembeli(false)
        setIsActiveTransaksiPembeli(false)
        setPage(<ProfilPenjualAdmin/>)
    }

    const handleProfilePembeli = () => {
        setIsActiveProfilePenjual(false)
        setIsActiveSemuaItem(false)
        setIsActiveKategoriItem(false)
        setIsActiveRiwayatMasuk(false)
        setIsActiveRiwayatKeluar(false)
        setIsActiveProfilePembeli(true)
        setIsActiveTransaksiPembeli(false)
        setPage(<ProfilPembeliAdmin/>)
    }

    const handleTransaksiPembeli = () => {
        setIsActiveProfilePenjual(false)
        setIsActiveSemuaItem(false)
        setIsActiveKategoriItem(false)
        setIsActiveRiwayatMasuk(false)
        setIsActiveRiwayatKeluar(false)
        setIsActiveProfilePembeli(false)
        setIsActiveTransaksiPembeli(true)
        setPage(<TransaksiPembeliAdmin/>)
    }

    const handleSemuaItem = () => {
        setIsActiveProfilePenjual(false)
        setIsActiveSemuaItem(true)
        setIsActiveKategoriItem(false)
        setIsActiveRiwayatMasuk(false)
        setIsActiveRiwayatKeluar(false)
        setIsActiveProfilePembeli(false)
        setIsActiveTransaksiPembeli(false)
        setPage(<SemuaItemAdmin/>)
    }

    const handleKategoriItem = () => {
        setIsActiveProfilePenjual(false)
        setIsActiveSemuaItem(false)
        setIsActiveKategoriItem(true)
        setIsActiveRiwayatMasuk(false)
        setIsActiveRiwayatKeluar(false)
        setIsActiveProfilePembeli(false)
        setIsActiveTransaksiPembeli(false)
        setPage(<KategoriItem/>)
    }

    const handleRiwayatMasuk = () => {
        setIsActiveProfilePenjual(false)
        setIsActiveSemuaItem(false)
        setIsActiveKategoriItem(false)
        setIsActiveRiwayatMasuk(true)
        setIsActiveRiwayatKeluar(false)
        setIsActiveProfilePembeli(false)
        setIsActiveTransaksiPembeli(false)
        setPage(<PemasukanItemAdmin/>)
    }

    const handleRiwayatKeluar = () => {
        setIsActiveProfilePenjual(false)
        setIsActiveSemuaItem(false)
        setIsActiveKategoriItem(false)
        setIsActiveRiwayatMasuk(false)
        setIsActiveRiwayatKeluar(true)
        setIsActiveProfilePembeli(false)
        setIsActiveTransaksiPembeli(false)
        setPage(<PengeluaranItemAdmin/>)
    }

    const handleKonfirmasi= () => {
        setOpenPembeli(false)
        setOpenPenjual(false)
        setOpenItem(false)
        setIsActiveProfilePenjual(false)
        setIsActiveSemuaItem(false)
        setIsActiveKategoriItem(false)
        setIsActiveRiwayatMasuk(false)
        setIsActiveRiwayatKeluar(false)
        setIsActiveProfilePembeli(false)
        setIsActiveTransaksiPembeli(false)
        setPage(<NotifPesanan/>)
    }

    const handleLogout = () => {
        Cookies.remove('id')
        setTimeout(()=>{
            navigate('/')
        }, 100)
    };
    return ( 
        <div className="sidebar-admin pt-4 px-2">
             <div className="logo-skw-sidebar pt-1 px-2 mx-3 d-flex" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>
                <p className='text-logo-skw-admin d-flex align-items-center'>SKW</p>
                <p className='text-skw-penjual d-flex align-items-center'>ADMIN</p>
            </div>

            <hr />

            <div className="sidebar-item">
                <div className="sidebar-title d-flex align-items-center" onClick={handleOpenAdmin}>
                    <BsFillFilePersonFill className='icon-title' color='white' size="30px"/>
                    <p className='text-sidebar-admin-title pt-3' id='text-sidebar-admin'>Profile Admin </p>
                </div>
            </div>

            <div className={openPenjual ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title d-flex align-items-center" onClick={handleOpenPenjual}>
                    <IoStorefront className='icon-title' color='white' size="40px"/>
                    <p className='text-sidebar-admin-title pt-3' id='text-sidebar-admin'>Penjual </p>
                    <BsFillCaretRightFill size="25px" color='white' className='toggle-btn d-flex justify-content-end'/>
                </div>
                <div className="sidebar-content ">
                    <p className={`${!isActiveProfilePenjual ? 'text-sidebar-admin-content' : 'text-sidebar-admin-content-active' } d-flex align-items-center my-1`} onClick={handleProfilPenjual}>Profile Penjual</p>
                </div>
            </div>

            <div className={openPembeli ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title d-flex align-items-center" onClick={handleOpenPembeli}>
                    <BsPersonFill className='icon-title' color='white' size="40px"/>
                    <p className='text-sidebar-admin-title pt-3' id='text-sidebar-admin'>Pembeli </p>
                    <BsFillCaretRightFill size="25px" color='white' className='toggle-btn d-flex justify-content-end ' />
                </div>
                <div className="sidebar-content ">
                    <p className={`${!isActiveProfilePembeli ? 'text-sidebar-admin-content' : 'text-sidebar-admin-content-active' } d-flex align-items-center my-1`} id='text-sidebar-admin' onClick={handleProfilePembeli}>Profile Pembeli</p>
                    <p className={`${!isActiveTransaksiPembeli ? 'text-sidebar-admin-content' : 'text-sidebar-admin-content-active' } d-flex align-items-center my-1`} id='text-sidebar-admin' onClick={handleTransaksiPembeli}>Riwayat Transaksi</p>                
                </div>
            </div>

            <div className={openItem ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title d-flex align-items-center"  onClick={handleOpenItem}>
                    <BiCollection className='icon-title' color='white' size="40px"/>
                    <p className='text-sidebar-admin-title  pt-3' id='text-sidebar-admin'>Item </p>
                    <BsFillCaretRightFill size="25px" color='white' className='toggle-btn d-flex justify-content-end '/>
                </div>

                <div className="sidebar-content ">
                    <p className={`${!isActiveSemuaItem ? 'text-sidebar-admin-content' : 'text-sidebar-admin-content-active' } d-flex align-items-center my-1`} onClick={handleSemuaItem}>Semua Item</p>
                    <p className={`${!isActiveKategoriItem ? 'text-sidebar-admin-content' : 'text-sidebar-admin-content-active' } d-flex align-items-center my-1`} onClick={handleKategoriItem}>Kategori Item</p>
                    <p className={`${!isActiveRiwayatMasuk ? 'text-sidebar-admin-content' : 'text-sidebar-admin-content-active' } d-flex align-items-center my-1`} onClick={handleRiwayatMasuk}>Riwayat Item Masuk</p>
                    <p className={`${!isActiveRiwayatKeluar ? 'text-sidebar-admin-content' : 'text-sidebar-admin-content-active' } d-flex align-items-center my-1`} onClick={handleRiwayatKeluar}>Riwayat Item Keluar</p>
                </div>
            </div>

            <div className="sidebar-item">
                <div className="sidebar-title d-flex align-items-center">
                    <p className="text-sidebar-admin-title pt-3" id='text-sidebar-admin' onClick={handleKonfirmasi}>Konfirmasi Pembayaran</p>
                    <div className="bg-text-notif-pesanan d-flex justify-content-center">
                        <p className="text-notif-pesanan">{dataKonfirmasi.length}</p>
                    </div>
                </div>
            </div>

            <div className="my-2 d-flex justify-content-center">
                <button className='but-logout-admin' onClick={handleLogout}>Logout</button>
            </div>

        </div>
     );
}
 
export default Sidebaradmin;