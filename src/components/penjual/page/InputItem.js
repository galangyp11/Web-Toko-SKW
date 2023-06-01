import './inputitem.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { GoFileMedia } from "react-icons/go";
import apiHost from '../../../constants/apiHost';
import ItemToko from './ItemToko';
import { useNavigate } from 'react-router-dom';
import Alert from '../../AlertHijau'

const InputItem = ({setIsUbah, setPageItem}) => {

    const id = Cookies.get('id')
    const navigate = useNavigate()
    const [dataInput, setDataInput] = useState({
        id_penjual: '',
        nama_item: "",
        harga_item: "",
        foto_item: [],
        deksripsi_item: "",
        id_kategori: "",
        stok_item: "",
        warna_item: "",
        ukuran_item: [],
        biaya_operasional: "",
        tgl_input : ""
    });
    const [isChecked, setIsChecked] = useState(false)
    const tanggal = new Date()
    const [isAlert, setIsAlert] = useState(false)
    const [textAlert, setTextAlert] = useState('')
 
    const handleInput = (e) =>{
        e.preventDefault()
            setDataInput((data) => ({...data, 
                [e.target.id] : e.target.value,
            }))
    }

    const handleInputUkuran = (e) =>{
        // setIsChecked(!isChecked)
        e.preventDefault()
        if(e.target.checked) {
            const dataUkuran = [...dataInput.ukuran_item]
            dataUkuran.splice(0, 0, e.target.value)
            // console.log(dataUkuran)
            setDataInput((data)=>({...data, ukuran_item : dataUkuran}))
        } else {
            setDataInput((data)=>({...data, ukuran_item: data.ukuran_item.splice(e.target.value, 1 )}))
        }

    }

    useEffect(()=>{
        setDataInput((data) => ({...data, 
            harga_item : "",
            stok_item : "",
            warna_item : "",
            // ukuran_item : [],
            biaya_operasional : ""
        }))
    },[dataInput.id_kategori])

    useEffect(()=>{
        setDataInput((data)=> ({...data,
            id_penjual : id
        }))
    }, [])

    const handleBatal = () => {
        setIsUbah(false)
        setPageItem(null)
    }

    const handleDaftarPenjual = async (e) =>{
        e.preventDefault()
        const tgl_input = tanggal.getDate() + '/' + (+tanggal.getMonth() + 1) + '/' + tanggal.getFullYear()
        setDataInput((data) => ({...data,
            tgl_input : tgl_input
        }))
        try {   
            let formData = new FormData();
            
            for (const [key, value] of Object.entries(dataInput)) {
                if (key !== 'foto_item' && key !== 'ukuran_item') {
                    formData.append(key, value)
                }             
            }
            
            for (let i = 0; i < dataInput.foto_item.length; i++) {
                formData.append('foto_item', dataInput.foto_item[i])

            }

            for (let i = 0; i < dataInput.ukuran_item.length; i++) {
                formData.append('ukuran_item', dataInput.ukuran_item[i])

            }
            
            await axios.post(`${apiHost}item`, formData);
            setIsAlert(true)
            setTextAlert('Item berhasil diinput')
            // console.log(dataInput.ukuran_item.length)
            // console.log(formData)
            setPageItem(<ItemToko/>)
        } catch (error) {
            console.log('eror bang gabisa input', error)
        }
    }

    const onChangeFile = (evt) => {
        if (evt.target.files.length > 4 ) {
            alert('maksimum upload 4 file')
            document.getElementById('imageFile').value = ""
            setDataInput((data)=> ({...data,
                foto_item : []
            }))
            return false
        }
        setDataInput((data)=> ({...data,
            foto_item : evt.target.files    
        }))
    }
    

    // console.log(dataInput)
    // console.log(dataInput.id_kategori)

    return ( 
        <div className="">
            <p className='text-title-halaman'>Input Item</p>
            <div className='item-toko container p-4'>
            
            <div className="form-body-penjual gap-1 d-flex justify-content-center row">
                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <div className="input-gambar-item d-flex align-items-center justify-content-center">
                            <GoFileMedia color='white' size='30px'/>
                        </div>
                    </div>
                    <div className="col">
                        <input id="imageFile" type="file" multiple onChange={onChangeFile} accept='image/png' />
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="nama_item"  id='label-input'>Nama item</label>
                    </div>
                    <div className="col">
                        <input
                            className='input-text'
                            type="text"
                            id="nama_item"
                            value={dataInput.nama_item}
                            onChange={handleInput}
                        />
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="deksripsi_item"  id='label-input'>Deksripsi</label>
                    </div>
                    <div className="col">
                        <textarea 
                            className='input-text' 
                            name="deksripsi" 
                            id="deksripsi_item"
                            style={{resize:"none", height:"100px"}}
                            value={dataInput.deksripsi_item}
                            onChange={handleInput}
                        ></textarea>
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="id_kategori" id='label-input'>Kategori</label>
                    </div>
                    <div className="col">
                        <select 
                            name="kategori" 
                            id="id_kategori" 
                            className='input-text'
                            value={dataInput.id_kategori}
                            onChange={handleInput}
                        >
                            <option value="1">Makanan</option>
                            <option value="2">Minuman</option>
                            <option value="3">Pakaian</option>
                            <option value="4">Aksesoris</option>
                            <option value="5">kerajinan</option>
                            <option value="6">Jasa</option>
                        </select>
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="harga_item"  id='label-input'>Harga</label>
                    </div>
                    <div className="col">
                        <input
                            className='input-text'
                            type="number"
                            id="harga_item"
                            value={dataInput.harga_item}
                            onChange={handleInput}
                            disabled={dataInput.id_kategori !== "6" ? false : true}
                        />
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="stok_item"  id='label-input'>Stok</label>
                    </div>
                    <div className="col">
                        <input
                            className='input-text'
                            type="number"
                            id="stok_item"
                            value={dataInput.stok_item}
                            onChange={handleInput}
                        />
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="warna_item"  id='label-input'>Warna</label>
                    </div>
                    <div className="col">
                        <input
                            className='input-text'
                            type="text"
                            id="warna_item"
                            value={dataInput.warna_item}
                            onChange={handleInput}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        />
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="ukuran_item"  id='label-input'>Ukuran</label>
                    </div>
                    <div className="col">
                        <input 
                            type="checkbox"
                            id="0" 
                            value="XL"
                            onChange={handleInputUkuran}
                            // checked={isChecked}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> XL
                        <br />
                        <input 
                            type="checkbox" 
                            id="1" 
                            value="L"
                            onChange={handleInputUkuran}
                            // checked={isChecked}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> L
                        <br />
                        <input 
                            type="checkbox" 
                            id="2" 
                            value="M"
                            onChange={handleInputUkuran}
                            // checked={isChecked}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> M
                        <br />
                        <input 
                            type="checkbox" 
                            id="3" 
                            value="S"
                            onChange={handleInputUkuran}
                            // checked={isChecked}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> S
                        <br />
                        <input 
                            type="checkbox" 
                            id="4" 
                            value="Semua Ukuran"
                            onChange={handleInputUkuran}
                            // checked={isChecked}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> Semua Ukuran
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="biaya_operasional"  id='label-input'>Biaya Operasional</label>
                    </div>
                    <div className="col">
                        <input
                            className='input-text'
                            type="number"
                            id="biaya_operasional"
                            value={dataInput.biaya_operasional}
                            onChange={handleInput}
                            disabled={dataInput.id_kategori === "6" ? false : true}
                        />
                    </div>
                </div>
            </div>

            <hr />

            <div className="row my-2">
                <div className="col d-flex justify-content-end">
                    <button className='btn btn-outline-danger but-tolak-pesanan' onClick={handleBatal}>Batal</button>
                </div>
                <div className="col-2 d-flex justify-content-start">
                    <button className='but-input-item-penjual' onClick={handleDaftarPenjual}>Input</button>
                </div>
            </div>
            </div>
            <div className="d-flex justify-content-center" >
          {isAlert ? <Alert textAlert={textAlert} isAlert={isAlert} setIsAlert={setIsAlert}/> : <div></div>}
        </div>
        </div>
     );
}
 
export default InputItem;