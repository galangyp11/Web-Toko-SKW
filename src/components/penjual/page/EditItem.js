import './inputitem.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { GoFileMedia } from "react-icons/go";
import apiHost from '../../../constants/apiHost';
import ItemToko from './ItemToko';

const EditItem = ({id_item, setIsUbah, setPageItem}) => {

    const [itemById, setItemById] = useState({})
    const id = Cookies.get('id')
    const [dataInput, setDataInput] = useState({
        id_item: '',
        id_penjual: '',
        nama_item: "",
        harga_item: "",
        foto_item: [],
        deskripsi_item: "",
        id_kategori: "",
        stok_item: "",
        warna_item: "",
        ukuran_item: [],
        biaya_operasional: "",
        tgl_input : ""
    });
    const tanggal = new Date()

    useEffect(()=>{
        const getItemById = async () => {
            const response = await axios.get(`${apiHost}item/${id_item}`);
            setItemById(response.data);
          };
          getItemById();
    },[])
 
    const handleInput = (e) =>{
        e.preventDefault()
                 
        setDataInput((data) => ({...data, 
            [e.target.id] : e.target.value,
        }))
    }

    useEffect((e)=>{
        setDataInput((data)=> ({...data,
            id_penjual : id,
            id_item : itemById.id_item,
            nama_item: itemById.nama_item,
            harga_item: itemById.harga_item,
            deskripsi_item: itemById.deskripsi_item,
            id_kategori: itemById.id_kategori,
            stok_item: itemById.stok_item,
            warna_item: itemById.warna_item,
            ukuran_item: [],
            biaya_operasional: itemById.biaya_operasional,
            tgl_input : itemById.tgl_input
        }))
    },[itemById])

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
                if (key !== 'foto_item') {
                    formData.append(key, value)
                }
            }
            
            for (let i = 0; i < dataInput.foto_item.length; i++) {
                formData.append('foto_item', dataInput.foto_item[i])

            }
            
            await axios.put(`${apiHost}item`, formData);
            alert('udh berhasil daftar bang');
            setPageItem(<ItemToko/>)
        } catch (error) {
            console.log('eror bang gabisa input', error)
        }
    }

    const onChangeFile = (evt) => {
        if (evt.target.files.length > 4 ) {
            alert('maksimum upload 4     file')
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

    console.log(itemById)
    console.log(dataInput)
    // console.log(id_item)
    return ( 
        <div className="edit-item">
            <p className='text-title-halaman'>Edit Item</p>
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
                            placeholder={itemById.nama_item}
                            //value={dataInput.nama_item}
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
                            placeholder={itemById.deskripsi_item}
                            //value={dataInput.deksripsi_item}
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
                            // placeholder={itemById.nama_item}
                            //value={dataInput.id_kategori}
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
                            type="text"
                            id="harga_item"
                            placeholder={itemById.harga_item}
                            //value={dataInput.harga_item}
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
                            type="text"
                            id="stok_item"
                            placeholder={itemById.stok_item}
                            //value={dataInput.stok_item}
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
                            placeholder={itemById.warna_item}
                            //value={dataInput.warna_item}
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
                            id="ukuran_item" 
                            value="XL"
                            onChange={handleInput}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> XL
                        <br />
                        <input 
                            type="checkbox" 
                            id="ukuran_item" 
                            value="XL"
                            onChange={handleInput}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> L
                        <br />
                        <input 
                            type="checkbox" 
                            id="ukuran_item" 
                            value="XL"
                            onChange={handleInput}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> M
                        <br />
                        <input 
                            type="checkbox" 
                            id="ukuran_item" 
                            value="XL"
                            onChange={handleInput}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> S
                        <br />
                        <input 
                            type="checkbox" 
                            id="ukuran_item" 
                            value="XL"
                            onChange={handleInput}
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
                            type="text"
                            id="biaya_operasional"
                            placeholder={itemById.biaya_operasional}
                            //value={dataInput.biaya_operasional}
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
        </div>
     );
}
 
export default EditItem;