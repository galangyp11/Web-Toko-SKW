import './inputitem.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { GoFileMedia } from "react-icons/go";

const InputItem = () => {

    const id = Cookies.get('id')
    const [dataInput, setDataInput] = useState({
        id_penjual: '',
        nama_item: "",
        harga_item: "",
        foto_item: "",
        deksripsi_item: "",
        id_kategori: "",
        stok_item: "",
        warna_item: "",
        ukuran_item: "",
        biaya_operasional: ""
    });

    const handleInput = (e) =>{
        setDataInput((data) => ({...data, 
            [e.target.id] : e.target.value
        }))
    }

    useEffect(()=>{
        setDataInput((data)=> ({...data,
            id_penjual : id
        }))
    }, [])
    
    const handleDaftarPenjual = async (e) =>{
        e.preventDefault()
        try {   
            await axios.post(`http://localhost:3311/item`, dataInput);
            alert('udh berhasil daftar bang');
            // navigate('/login');
        } catch (error) {
            console.log('eror bang gabisa input')
        }
    }

    console.log(dataInput)

    return ( 
        <div className="input-item container-fluid">
            <div className="form-body-penjual gap-2 d-flex justify-content-center row border">
                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <div className="input-gambar-item d-flex align-items-center justify-content-center">
                            <GoFileMedia color='white' size='30px'/>
                        </div>
                    </div>
                    <div className="col">
                        <input type="file"/>
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
                            style={{resize:"none", height:"200px"}}
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
                            <option value="null" >-Pilih Kategori-</option>
                            <option value="1">Makanan</option>
                            <option value="2">Minuman</option>
                            <option value="3">Pakaian</option>
                            <option value="4">Aksesoris</option>
                            <option value="5">kerajinan</option>
                            <option value="6">jasa</option>
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
                            type="text"
                            id="harga_item"
                            value={dataInput.harga_item}
                            onChange={handleInput}
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
                            type="text"
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
                        />
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="ukuran_item"  id='label-input'>Ukuran</label>
                    </div>
                    <div className="col">
                        <input
                            className='input-text'
                            type="text"
                            id="ukuran_item"
                            value={dataInput.ukuran_item}
                            onChange={handleInput}
                        />
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="biaya_operasional"  id='label-input'>Biaya Operasional</label>
                    </div>
                    <div className="col">
                        <input
                            className='input-text'
                            type="text"
                            id="biaya_operasional"
                            value={dataInput.biaya_operasional}
                            onChange={handleInput}
                        />
                    </div>
                </div>
            </div>

                    <div className="col d-flex justify-content-end">
                            <div className="but-next-daftar" onClick={handleDaftarPenjual}>
                                <p className='text-but-next-daftar d-flex justify-content-center align-items-center' >Masukkan Item</p>
                            </div>
                        </div>
        </div>
     );
}
 
export default InputItem;