import './notifpesanan.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const NotifPesanan = () => {

    const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
    const [dataInput , setDataInput] = useState({   
        status_transaksi:'Pesanan sedang di proses'
    })

    useEffect(()=>{
        const getNotif = async () => {
            const response = await axios.get('http://localhost:3311/transaksi')
            setDataKonfirmasi(response.data)
        }
        getNotif()
    },[dataKonfirmasi])

    const handleTolak = () => {
        alert('nanti status pesanannya ditolak')
    }

    const handleKonfirmasi = async(id, e) => {
        
        e.preventDefault()
        try {
            await axios.put(`http://localhost:3311/transaksi/${id}`, dataInput);
            alert('Berhasil di KOnfirmasi');
        } catch (error) {
            console.log('eror bang gabisa input')
        }
    }
    
    console.log(dataInput)
    
    return ( 
        <div className="notif-pesanan container-fluid border">
            <p className='text-title-halaman'>Konfirmasi Pembayaran Pesanan</p>

            <div className="row">
                <p className='text-alert-notif-pesanan'>MOHON untuk cek dengan benar-benar teliti sebelum KONFIRMASI pensanan ! 
                <p className='text-pemberitahuan-notif-pesanan'>Konfirmasi pesanan secepatnya agar segera diproses oleh penjual</p></p>
                
            </div>

            <div className="row ">
                <table class="table my-5 table-bordered">
                    <thead className="table-dark table-striped">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Pembayaran</th>
                            <th scope="col">Nominal Harga</th>
                            <th scope="col">Waktu</th>
                            <th className='col-2' scope="col" colSpan="2" style={{textAlign:"center"}}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {dataKonfirmasi.map((data) =>{
                        
                        return(
                        <tr key={data.id_transaksi}>
                            <td>{data.username}</td>
                            <td>{data.nama_mp}</td>
                            <td>Rp. 69.000</td>
                            <td>12:04 17/5/23 </td>
                            <td style={{textAlign:"center"}}>
                                <button className="btn btn-danger but-tolak-pesanan" onClick={handleTolak}>Tolak</button>    
                            </td>
                            <td style={{textAlign:"center"}}>
                                <button className="btn btn-primary but-konfirmasi-pesanan" onClick={(e)=> handleKonfirmasi(data.id_transaksi, e)}>Konfirmasi</button>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default NotifPesanan;