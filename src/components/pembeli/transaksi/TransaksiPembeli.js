import NavbarTransaksi from './NavbarTransaksi'

import apiHost from '../../../constants/apiHost'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const TransaksiPembeli = () => {
    const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
    const id = Cookies.get('id')

    useEffect(()=>{
        const getNotif = async () => {
            const response = await axios.get(`${apiHost}/transaksi/pembeli/${id}`)
            setDataKonfirmasi(response.data)
        }
        getNotif()
    },[dataKonfirmasi])
    return ( 
        <div className="transaksi-pembeli">
            <div className="sticky-top">
                <NavbarTransaksi />
            </div>

            <div className="profilepembeli-con container">
                <div className="row ">
                    <table class="table my-5 table-bordered">
                        <thead className="table-dark table-striped">
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Pembayaran</th>
                                <th scope="col">Nominal Harga</th>
                                <th scope="col">Waktu</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {dataKonfirmasi.map((data) =>{
                            return(
                            <tr key={data.id_konfirmasi}>
                                <td>{data.username}</td>
                                <td>{data.nama_mp}</td>
                                <td>Rp. 69.000</td>
                                <td>12:04 17/5/23 </td>
                                <td>{data.status_transaksi}</td>
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
 
export default TransaksiPembeli;