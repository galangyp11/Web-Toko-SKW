import './checkout.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import NavbarCheck from './NavbarCheck'
import ItemsCheck from './ItemsCheck'

const CheckPembeli = () => {

    const navigate = useNavigate()
    const [datum, setDatum] = useState([]);
    const [dataAdmin, setDataAdmin] = useState({});

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/checkout`)
            setDatum(response.data)
            // console.log(response)
        }
        dataDB()
    },[]);

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`http://localhost:3311/admin`)
            setDataAdmin(response.data)
            // console.log(response)
        }
        dataDB()
    },[datum]);

    console.log(dataAdmin)

    const handleBatal = () =>{
        navigate('/')
    }

    return ( 
        <div className="check-pembeli">
             <div className="sticky-top">
                <NavbarCheck/>
            </div>

            <div className="check-con container py-1 px-5">
                <div className="row">
                    <ItemsCheck datum={datum}/>
                </div>

                <div className="row">
                    <p className='text-sub-checkout'>Alamat :</p>
                    <div className="col">
                        <textarea className="alamat-checkout" ></textarea>
                    </div>
                    <div className="col">
                        <p className='text-info-checkout'>*Pastikan alamat sudah benar dan jelas agar memudahkan proses.</p>
                    </div>
                </div>
                
                <div className="row">
                    <p className='text-sub-checkout'>Pilih Metode Pembayaran :</p>
                    <div className="col">
                        <select 
                            name="kategori" 
                            id="id_kategori" 
                            className='input-text'
                            // value={dataInput.id_kategori}
                            // onChange={handleInput}
                        >
                            <option value="null" >-Pilih Metode Pembayaran-</option>
                            <option value="1">BCA</option>
                            <option value="2">DANA</option>
                            <option value="3">GoPay</option>
                            <option value="4">ShopeePay</option>
                            <option value="5">OVO</option>
                        </select>
                    </div>
                    <div className="col">
                        <p className='text-info-checkout'>*Semua proses transaksi menggunakan metode transfer. <br /> 
                        DILARANG melakukan transaksi dengan media lain termasuk transfer ke penjual langsung demi keamanan bersama. <br />
                        Transaksi diluar dari pilihan transfer bukan tanggung jawab kami.</p>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <p className='text-sub-checkout'>Pesanan :</p>
                    <div className="row" style={{width:'50dvw'}}>
                        <div className="col-3">
                            <p>Total Harga</p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col">
                            <p>Rp.69.000</p>
                        </div>
                    </div>
                    <div className="row" style={{width:'50dvw'}}>
                        <div className="col-3">
                            <p>Total Item</p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col">
                            <p>3</p>
                        </div>
                    </div>
                    <div className="row" style={{width:'50dvw'}}>
                        <div className="col-3" >
                            <p>Metode Pembayaran</p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col">
                            <p>DANA</p>
                        </div>
                    </div>
                    <p className='text-info-checkout'>Dimohon untuk cek kembali sebelum membayar</p>
                </div>

                <div className="row my-3 d-flex justify-content-center">
                    <div className="row ">
                        <div className="col-2">
                            <button className='but-batal-checkout' onClick={handleBatal}>Batal</button>
                        </div>

                        <div className="col">
                           <button className='but-bayar-checkout'>Bayar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CheckPembeli;