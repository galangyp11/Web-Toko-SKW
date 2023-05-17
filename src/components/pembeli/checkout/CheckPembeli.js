import './checkout.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import NavbarCheck from './NavbarCheck'
import ItemsCheck from './ItemsCheck'
import ModalCheck from './ModalCheck'

const CheckPembeli = () => {

    const navigate = useNavigate()
    const [datum, setDatum] = useState([]);
    const [dataAdmin, setDataAdmin] = useState({});
    const [dataInput, setDataInput] = useState({
        id_checkout: '',
        pembayaran: '',
        waktu_pesan:''
    })
    const [isShow, setIsShow] = useState(false)

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
        }
        dataDB()
    },[]);

    const handleMP = () =>{

    }

    console.log(dataAdmin)

    const handleBatal = async() =>{
        await axios.delete('http://localhost:3311/checkout')
        navigate('/')
    }

    const handleBayar = async(e) =>{
        e.preventDefault()
        await axios.post()


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
                            <option value="1" onChange={handleMP}>BCA</option>
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
                           <button className='but-bayar-checkout' data-bs-toggle="modal" data-bs-target="#modal-bayar" onClick={handleBayar}>Bayar</button>
                        </div>
                    </div>
                </div> 

                <div class="modal fade" id="modal-bayar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog  modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <p class="modal-title" id="staticBackdropLabel">Pembayaran</p>
                            </div>
                        <div class="modal-body d-flex justify-content-center" style={{height:"50dvh"}}>
                            <div className="row container d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <p className='text-mp-modal'>DANA 081211139102</p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p className="text-mp-nama-modal">A/N ADMIN SUPRI</p>
                                </div>

                                <div className="row mt-5">
                                    <div className="col-3">
                                        <p className='text-info-modal'>Total Harga</p>
                                    </div>
                                    <div className="col-1">
                                        <p className='text-info-modal'>:</p>
                                    </div>
                                    <div className="col">
                                        <p className='text-info-modal'>Rp. 69.000</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-3">
                                        <p className='text-info-modal'>Metode Pembayaran</p>
                                    </div>
                                    <div className="col-1">
                                        <p className='text-info-modal'>:</p>
                                    </div>
                                    <div className="col">
                                        <p className='text-info-modal'>DANA</p>
                                    </div>
                                </div>

                                <div className="row d-flex align-items-end">
                                    <p className='text-info-modal'>Lakukan pembayaran transfer dengan ke nomor diatas. Pastikan kembali sebelum transfer. <br />Halaman akan otomatis tertutup dalam 10 menit</p>
                                </div>
                            </div>

                        </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <div className="row">
                                    <p>10:00</p>
                                </div>
                                <div className="row ">
                                    <p data-bs-dismiss="modal">Close</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* <ModalCheck isShow={isShow} setIsShow={setIsShow}/> */}
            </div>
        </div>
     );
}
 
export default CheckPembeli;