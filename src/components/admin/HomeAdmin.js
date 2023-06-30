import { useEffect, useState } from 'react';
import './homeadmin.css'
import axios from 'axios';
import apiHost from '../../constants/apiHost';
import Cookies from 'js-cookie';
import { BsDash } from 'react-icons/bs';

const HomeAdmin = () => {

    const [dataPembeli, setDataPembeli] = useState([]);
    const [dataPenjual, setDataPenjual] = useState([]);
    const [dataItem, setDataItem] = useState([]);
    const [dataMetodePembayaran, setDataMetodePembayaran] = useState([]);
    const [dataAdmin, setDataAdmin] = useState({});
    const id = Cookies.get("id");

    const [isTambahMP, setIsTambahMP] = useState(false)

    useEffect(()=>{
        const getPembeli = async () => {
            const response = await axios.get(`${apiHost}pembeli`)
            setDataPembeli(response.data)
        }
        getPembeli()

        const getPenjual = async () => {
            const response = await axios.get(`${apiHost}penjual`)
            setDataPenjual(response.data)
        }
        getPenjual()

        const getItem = async () => {
            const response = await axios.get(`${apiHost}total-item`)
            setDataItem(response.data)
        }
        getItem()

        const getAdmin = async() => {
            const response = await axios.get(`${apiHost}admin/${id}`)
            setDataAdmin(response.data);
        }
        getAdmin()

        const getMp = async() => {
            const response = await axios.get(`${apiHost}metode_pembayaran`)
            setDataMetodePembayaran(response.data);
        }
        getMp()
    },[])

    const handleTambahMP = (e) => {
        e.preventDefault()

        setIsTambahMP(true)
    }

    const handleSimpanMP = (e) => {

    }

    const handleBatalMP = (e) => {
        e.preventDefault()

        setIsTambahMP(false)
    }

    // useEffect(()=>{
    //     setUsername(dataAdmin[0].username)
    // },[dataAdmin])

    console.log({
        dataAdmin,
        dataMetodePembayaran
    })

    return ( 
        <div className="home-admin p-3 container-fluid">
            <div className='d-flex gap-3'>
                <p className="text-home-admin">Selamat Datang</p>
                <p className='text-username-home-admin'>{dataAdmin.username}</p>
            </div>

            <div className="d-flex justify-content-center">
                <div className="bg-info-skw-admin p-3 d-flex align-items-center gap-2">
                    <p className='text-info-skw-admin'>Saat ini telah terdaftar</p>
                    <p className='text-info-skw-data-admin'>{dataPenjual.length}</p> 
                    <p className='text-info-skw-admin'>pengguna toko dan</p>
                    <p className='text-info-skw-data-admin'>{dataPembeli.length}</p> 
                    <p className='text-info-skw-admin'>pengguna pembeli. Seluruh item yang tersedia pada SKW ini berjumlah </p>
                    <p className='text-info-skw-data-admin'>{dataItem.length}</p> 
                    <p className='text-info-skw-admin'>item</p>
                </div>
            </div>

            <div className="row ">
                <div className="col ">
                    <div className="bg-info-data-admin my-3 p-3">
                        <p className="text-judul-data-admin">Data Admin</p>
                        <hr />

                        <div className="row">                            
                            <div className="bg-data-info row">
                                <div className="col-4">
                                    <p className="text-data-info">Email</p>
                                </div>
                                <div className="col-1 p-0">
                                    <p>:</p>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="input-text" value={dataAdmin.email} disabled />
                                </div>
                            </div>

                            <div className="bg-data-info row">
                                <div className="col-4">
                                    <p className="text-data-info">Username</p>
                                </div>
                                <div className="col-1 p-0">
                                    <p>:</p>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="input-text" value={dataAdmin.username} disabled />
                                </div>
                            </div>

                            <div className="bg-data-info row">
                                <div className="col-4">
                                    <p className="text-data-info">Password</p>
                                </div>
                                <div className="col-1 p-0">
                                    <p>:</p>
                                </div>
                                <div className="col-3">
                                    <input type="password" className="input-text" value={dataAdmin.password} disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="row bg-info-data-admin my-3 p-3">
                        <p className="text-judul-data-admin">Metode Pembayaran</p>
                        <hr />

                        {dataMetodePembayaran?.map((data)=>{
                            return(
                            <div className="bg-data-info row">
                                <div className="col-4">
                                    <p className="text-data-info">{data.nama_mp}</p>
                                </div>
                                <div className="col-1 p-0">
                                    <p>:</p>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="input-text" placeholder={data.no_mp} disabled />
                                </div>
                            </div>
                            )
                        })}                

                        {isTambahMP ?
                            <div>
                            <p className="text-mp-data-admin">Tambah Metode Pembayaran</p>
                            <div className="bg-data-info row">
                                <div className="col-4">
                                    <input type="text" className='input-text' placeholder='Nama metode pembayaran' style={{width:"10em"}}/>
                                </div>
                                <div className="col-1 p-0">
                                    <p>:</p>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="input-text" placeholder="Nomor metode pembayaran"/>
                                </div>
                            </div>
                            </div>
                            : <></>}       
                             <div className="row my-2">
                        <div className="col d-flex justify-content-center">
                            {isTambahMP? <button className='btn btn-outline-danger but-tolak-pesanan' onClick={handleBatalMP}>Batal</button>
                            : <button className='btn btn-warning but-tolak-pesanan'>Edit</button>}
                        </div>
                        <div className="col d-flex justify-content-center">
                            {isTambahMP? <button className='but-input-item-penjual' onClick={handleSimpanMP} style={{width:"11em"}}>Simpan</button>
                            : <button className='but-input-item-penjual' onClick={handleTambahMP} style={{width:"11em"}}>Tambah Metode</button> }
                        </div>
                    </div> 
                    </div>
                   
                </div>
            
            </div>
        </div>
     );
}
 
export default HomeAdmin ;