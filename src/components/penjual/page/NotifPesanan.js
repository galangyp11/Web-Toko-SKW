import './notifpesanan.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import apiHost from '../../../constants/apiHost';

const NotifPesanan = () => {

    const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
    const [dataInput , setDataInput] = useState({   
        status_transaksi:'Pesanan sedang dikirim'
    })
    const id = Cookies.get('id')

    useEffect(()=>{
        const getNotif = async () => {
            const response = await axios.get(`${apiHost}transaksi/penjual/${id}`)
            setDataKonfirmasi(response.data)
        }
        getNotif()
    },[])

    const handleTolak = () => {
        alert('nanti status pesanannya ditolak')
    }

    const handleKonfirmasi = async(id, e) => {
        
        e.preventDefault()
        try {
            await axios.put(`${apiHost}transaksi/${id}`, dataInput);
            alert('Berhasil di KOnfirmasi');
        } catch (error) {
            console.log('eror bang gabisa input')
        }
    }
    
    console.log(dataInput)
    
    return ( 
        <div className="notif-pesanan container-fluid">
            <p className='text-title-halaman'>Konfirmasi Proses Pesanan</p>

            <div className='item-toko container p-4'>
            <div className="row">
                <p className='text-alert-notif-pesanan'>MOHON untuk cek dengan benar-benar teliti sebelum KIRIM pensanan ! 
                <p className='text-pemberitahuan-notif-pesanan'>Proses pesanan secepatnya</p></p>
                
            </div>

            <div className="row ">
                <table class="table my-5 table-bordered">
                    <thead className="table-dark table-striped">
                        <tr>
                            <th scope="col">Username Pembeli</th>
                            <th scope="col">Item</th>
                            <th scope="col">Nominal Harga</th>
                            <th scope="col">Jumlah</th>
                            <th scope="col">Alamat</th>
                            <th className='col-2' scope="col" colSpan="2" style={{textAlign:"center"}}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {dataKonfirmasi.map((data) =>{
                        
                        return(
                        <tr key={data.id_transaksi}>
                            <td>{data.username}</td>
                            <td>{data.nama_item}</td>
                            <td>{data.harga_item}</td>
                            <td>{data.stok_item}</td>
                            <td>{data.alamat}</td>
                            <td style={{textAlign:"center"}}>
                                <button className="btn btn-danger but-tolak-pesanan" onClick={handleTolak}>Tolak</button>    
                            </td>
                            <td style={{textAlign:"center"}}>
                                <button className="btn btn-primary but-konfirmasi-pesanan" onClick={(e)=> handleKonfirmasi(data.id_transaksi, e)}>Proses Selesai</button>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
     );
}
 
export default NotifPesanan;