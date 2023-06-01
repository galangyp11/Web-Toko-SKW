import './checkout.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import NavbarCheck from './NavbarCheck'
import ItemsCheck from './ItemsCheck'
import ModalCheck from './ModalCheck'
import Cookies from 'js-cookie'
import apiHost from '../../../constants/apiHost'
import Alert from '../../AlertMerah'

const CheckPembeli = () => {

    const id = Cookies.get('id')
    const navigate = useNavigate()

    const [dataCheckout, setDataCheckout] = useState([]);
    const [dataPembeli, setDataPembeli] = useState({});
    const [dataInput, setDataInput] = useState({
        id_pembeli:'',
        id_penjual:'',
        id_item:'',
        id_keranjang:'',
        id_mp: undefined,
        waktu_pesan:'',
        total_harga_transaksi:'',
        status_transaksi:'Menunggu Konfirmasi'
    });
    const [mpModal, setMpModal] = useState('')
    const [show, setShow] = useState(false)
    const [alamatPembeli, setAlamatPembeli] = useState({
        id_pembeli: "",
        alamat : ""
    })
    const [totalHarga, setTotalHarga] = useState('')
    const [isAlert, setIsAlert] = useState(false)
    const [textAlert, setTextAlert] = useState('')

    useEffect(()=>{
        const dataDB = async () => {
            const response = await axios.get(`${apiHost}keranjang/${id}`)
            setDataCheckout(response.data)
        }
        dataDB()    
        
        const getPembeliById = async () => {
            const response = await axios.get(`${apiHost}pembeli/${id}`);
            setDataPembeli(response.data);
        }
        getPembeliById()

    },[]);

    const handleInput = (e) => {
        setAlamatPembeli((data) => ({...data,
            id_pembeli : dataPembeli.id_pembeli,
            alamat : e.target.value
        }))
    }

    const handleInputMP = (e) => {
        setDataInput((data)=>({...data,
            id_mp : e.target.value
        }))
    }
    
    useEffect(()=>{
        if(dataInput.id_mp == 1){
            setMpModal('Bank')
        } else if(dataInput.id_mp == 2){
            setMpModal('DANA')
        } else if(dataInput.id_mp == 3){
            setMpModal('GoPay')
        } else if(dataInput.id_mp == 4){
            setMpModal('ShopeePay')
        } else if(dataInput.id_mp == 5){
            setMpModal('OVO')
        } else {
            setMpModal('-')
        }
    },[dataInput.id_mp])

    useEffect(()=>{
        const dataObj = () => {
            dataCheckout.map((data)=>{
                setDataInput((item) => ({...item,
                    id_pembeli : data.id_pembeli,
                    id_penjual : data.id_penjual,
                    id_item : data.id_item,
                    id_keranjang: data.id_keranjang,
                    id_mp : data.id_mp,
                    waktu_pesan: new Date(),
                    total_harga_transaksi : totalHarga
                }))
            })
        }
        dataObj()

    },[dataCheckout])

    useEffect(()=>{
        setAlamatPembeli((data)=>({...data,
            alamat : dataPembeli.alamat
        }))
    },[dataPembeli])

    useEffect(()=>{
        try {
            let i = 0
            dataCheckout.forEach((data)=>{
             i += data.total_harga
            setTotalHarga(i)
        })  
    
        } catch (error) {
            console.log(error)
        }
    })
    
    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    const handleBatal = async() =>{
        await axios.delete(`${apiHost}checkout`)
        navigate('/')
    }

    const handleBayar = async(e) =>{
        e.preventDefault()
        if(alamatPembeli.alamat === "") {
            setIsAlert(true)
            setTextAlert('Silahkan isi alamat kamu')
        }else if(dataInput.id_mp == undefined){
            setIsAlert(true)
            setTextAlert('Silahkan pilih metode pembayaran')
        }else{
            await axios.put(`${apiHost}alamat-pembeli`, alamatPembeli);
            await axios.post(`${apiHost}transaksi`, dataInput);
            setShow(true)
        }
    }

    // console.log(dataPembeli)
    // console.log(alamatPembeli)
    return ( 
        <div className="check-pembeli">
             <div className="sticky-top">
                <NavbarCheck/>
            </div>

            <div className="check-con container py-1 px-5">
                <div className="row">
                    <ItemsCheck dataCheckout={dataCheckout}/>
                </div>

                <div className="row">
                    <p className='text-sub-checkout'>Alamat :</p>
                    <div className="col">
                        <input 
                                className='text-profile-bio d-flex align-items-center' 
                                placeholder={dataPembeli.alamat}
                                id='alamat'
                                onChange={handleInput}
                        ></input>
                    </div>
                    <div className="col">
                        <p className='text-info-checkout'>*Pastikan alamat sudah benar dan jelas agar memudahkan proses.</p>
                    </div>
                </div>
                
                <div className="row">
                    <p className='text-sub-checkout'>Pilih Metode Pembayaran :</p>
                    <div className="col">
                        <select 
                            name="mp" 
                            id="id_mp" 
                            className='input-text'
                            value={dataInput.id_mp}
                            onChange={handleInputMP}
                        >
                            <option value="undefined" >-Pilih Metode Pembayaran-</option>
                            <option value="1">Bank</option>
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
                            <p>{formatUang(totalHarga).replace(/\,00/g, '')}</p>
                        </div>
                    </div>
                    <div className="row" style={{width:'50dvw'}}>
                        <div className="col-3">
                            <p>Total Item</p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col">
                            <p>{dataCheckout.length}</p>
                        </div>
                    </div>
                    <div className="row" style={{width:'50dvw'}}>
                        <div className="col-3" >
                            <p>Metode Pembayaran</p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col">
                            <p>{mpModal}</p>
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
                           <button className='but-bayar-checkout' onClick={handleBayar}>Bayar</button>
                        </div>
                    </div>
                </div>  
                <div>
                    <ModalCheck show={show} setShow={setShow} dataInput={dataInput} totalHarga={totalHarga}/>
                </div>
                <div className="d-flex justify-content-center" >
                    {isAlert ? <Alert textAlert={textAlert} isAlert={isAlert} setIsAlert={setIsAlert}/> : <div></div>}
                </div>           
            </div>
        </div>
     );
}
 
export default CheckPembeli;