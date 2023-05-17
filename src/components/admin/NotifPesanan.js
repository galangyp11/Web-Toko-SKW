import './notifpesanan.css'

const NotifPesanan = () => {

    const handleTolak = () => {
        alert('nanti status pesanannya ditolak')
    }

    const handleKonfirmasi = () => {
        alert('nanti status pesanannya diterima')
    }
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
                        <tr>
                            <td>UAJNG</td>
                            <td>DANA</td>
                            <td>Rp. 69.000</td>
                            <td>12:04 17/5/23 </td>
                            <td style={{textAlign:"center"}}>
                                <button className="btn btn-danger but-tolak-pesanan" onClick={handleTolak}>Tolak</button>    
                            </td>
                            <td style={{textAlign:"center"}}>
                                <button className="btn btn-primary but-konfirmasi-pesanan" onClick={handleKonfirmasi}>Konfirmasi</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default NotifPesanan;