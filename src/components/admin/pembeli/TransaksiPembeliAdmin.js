import { useState, useEffect } from "react";
import search from '../../image/search.png'
import axios from 'axios';
import apiHost from '../../../constants/apiHost'

const ProfilPenjualAdmin = () => {
    const [dataKonfirmasi, setDataKonfirmasi] = useState([]);
    const [currentPage,setCurrentPage] = useState (1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = currentPage - recordsPerPage;

    useEffect(()=>{
        const getNotif = async () => {
            const response = await axios.get(`${apiHost}transaksi/pembeli`)
            setDataKonfirmasi(response.data)
            console.log(response.data)
        }
        getNotif()
    },[])

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    function prePage (){
        if(currentPage !== firstIndex){
            setCurrentPage(currentPage - 1)
        }
     }
     function changeCpage(id) {
        setCurrentPage(id)
     }
     function nextPage (){
        if(currentPage !== lastIndex){
            setCurrentPage(currentPage +1)
        }
     }

     console.log(dataKonfirmasi)

    return ( 
        <div className="container-fluid ">
            <div className="row">
                <p className='text-title-halaman'>Riwayat Transaksi</p>
            </div>

            <div className="row">
                <div className="col-3 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                    <input className='search-admin p-2 ' type="text" placeholder='Search' />    
                        <div className="col-1 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                            <div className="logo-search-admin d-flex justify-content-center">
                                <img className='p-1' src={search} alt=""/>
                            </div>
                        </div>                     
                </div>
            </div>

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
                                <td>{data.waktu_pesan}</td>
                                <td>{data.status_transaksi}</td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
            
                <ul className='pagination d-flex align-items-end'>
                    <li className='page-item'>
                        <a href="#" className='page-link' onClick={prePage}>Prev</a>
                    </li>
                        {/* <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a href="#" className='page-link' onClick={changeCpage}>{n}</a>
                        </li>     */}

                    <li className='page-item'>
                        <a href="#" className='page-link' onClick={nextPage}>Next</a>
                    </li>
                </ul>
        </div>
     );
}
 
export default ProfilPenjualAdmin;