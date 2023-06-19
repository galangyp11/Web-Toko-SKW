import './notifpesanan.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import apiHost from '../../../constants/apiHost';
import Alert from '../../AlertHijau';

const ProsesPesanan = () => {

    const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
    const [dataInput , setDataInput] = useState({   
        status_transaksi:'Pesanan sedang dikirim'
    })
    const [dataRiwayatKeluar, setDataRiwayatKeluar] = useState({
        id_pembeli :'',
        id_penjual :'',
        id_item:'',
        id_transaksi:'',
        jumlah_beli:'',
        tanggal:'',
    })
    const id = Cookies.get('id')
    const tanggal = new Date()
    const [isAlert, setIsAlert] = useState(false)
    const [textAlert, setTextAlert] = useState('')

    useEffect(()=>{
        const getNotif = async () => {
            const response = await axios.get(`${apiHost}transaksi-proses/penjual/${id}`)
            setDataKonfirmasi(response.data)
        }
        getNotif()
    },[])

    useEffect(()=>{
        dataKonfirmasi.map((data)=>{
            setDataRiwayatKeluar((item)=>({
                ...item,
                id_pembeli: data.id_pembeli,
                id_penjual: data.id_penjual,
                id_item: data.id_item,
                id_transaksi: data.id_transaksi,
                jumlah_beli : data.jumlah_beli,
                tanggal: tanggal.getHours() + ':' + tanggal.getMinutes() + ' ' + tanggal.getDate() + '/' + (+tanggal.getMonth() + 1) + '/' + tanggal.getFullYear()
            }))
        })
    },[dataKonfirmasi])

    const handleTolak = () => {
        alert('nanti status pesanannya ditolak')
    }

    const handleKonfirmasi = async(id, e) => {
        e.preventDefault()

        await axios.put(`${apiHost}transaksi/${id}`, dataInput);
        await axios.post(`${apiHost}riwayat-item-keluar`, dataRiwayatKeluar);
        setIsAlert(true)
        setTextAlert('Pesanan telah dikirm')
        window.location.reload()
    }
    
    console.log({
        dataRiwayatKeluar,
        dataKonfirmasi
    })
    
    return ( 
        <div className="notif-pesanan container-fluid">
            <p className='text-title-halaman'>Konfirmasi Proses Selesai</p>

            <div className="row">
                <p className='text-alert-notif-pesanan'>MOHON untuk cek dengan benar-benar teliti sebelum KIRIM pensanan ! 
                <p className='text-pemberitahuan-notif-pesanan'>Proses pesanan secepatnya</p></p>
                
            </div>

            <div className="row ">
                <table className="table my-5 table-bordered">
                    <thead className="table-dark table-striped">
                        <tr>
                            <th className='col-1' scope="col">No</th>
                            <th scope="col">Username Pembeli</th>
                            <th scope="col">Item</th>
                            <th scope="col">Nominal Harga</th>
                            <th scope="col">Jumlah</th>
                            <th scope="col">Alamat</th>
                            <th className='col-2' scope="col" colSpan="2" style={{textAlign:"center"}}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {dataKonfirmasi.map((data, index) =>{
                        
                        return(
                        <tr key={data.id_transaksi}>
                            <td>{index +1}</td>
                            <td>{data.username}</td>
                            <td>{data.nama_item}</td>
                            <td>{data.harga_item}</td>
                            <td>{data.stok_item}</td>
                            <td>{data.alamat}</td>
                            <td style={{textAlign:"center"}}>
                                <button className="btn btn-danger but-tolak-pesanan" onClick={handleTolak}>Tolak</button>    
                            </td>
                            <td style={{textAlign:"center"}}>
                                <button className="btn btn-primary but-konfirmasi-pesanan" onClick={(e)=> handleKonfirmasi(data.id_transaksi, e)}>Kirim Pesanan</button>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center" >
                {isAlert ? <Alert textAlert={textAlert} isAlert={isAlert} setIsAlert={setIsAlert}/> : <div></div>}
            </div>
        </div>
     );
}
 
export default ProsesPesanan;