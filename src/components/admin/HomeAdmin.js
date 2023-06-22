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

            <div className="bg-info-data-admin my-3 p-3">
                <p className="text-judul-data-admin">Data Admin</p>
                <hr />
                <div className="row isi-data-admin">
                   
                        <p className="text-mp-data-admin">Metode Pembayaran</p>

                        {dataMetodePembayaran?.map((data)=>{
                            return(
                            <div className="bg-data-info row">
                                <div className="col-3">
                                    <p className="text-data-info">{data.nama_mp}</p>
                                </div>
                                <div className="col-1 p-0">
                                    <p>:</p>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="input-text" placeholder={data.no_mp} disabled style={{width:"9em"}}/>
                                </div>
                            </div>
                            )
                        })}                        
                   
                </div>
               
            </div>
            
        </div>
     );
}
 
export default HomeAdmin ;