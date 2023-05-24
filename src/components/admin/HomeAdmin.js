import { useEffect, useState } from 'react';
import './homeadmin.css'
import axios from 'axios';
import apiHost from '../../constants/apiHost';

const HomeAdmin = ({dataAdmin}) => {

    const [dataPembeli, setDataPembeli] = useState([])
    const [dataPenjual, setDataPenjual] = useState([])
    const [dataItem, setDataItem] = useState([])

    const [username, setUsername] = useState()
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
            const response = await axios.get(`${apiHost}item`)
            setDataItem(response.data)
        }
        getItem()
    },[])

    // useEffect(()=>{
    //     setUsername(dataAdmin[0].username)
    // },[dataAdmin])

    console.log(dataAdmin)

    return ( 
        <div className="home-admin p-3 container-fluid">
            <div className='d-flex gap-2'>
                <p className="text-home-admin">Selamat Datang</p>
                <p className='text-username-home-admin'></p>
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
            
        </div>
     );
}
 
export default HomeAdmin ;