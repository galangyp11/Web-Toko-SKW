import './inputitem.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { GoFileMedia } from "react-icons/go";
import apiHost from '../../../constants/apiHost';
import ItemToko from './ItemToko';
import { useNavigate } from 'react-router-dom';
import { BsFillPlusSquareFill, BsDash } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Alert from '../../AlertHijau'

const InputItem = ({setIsUbah, setPageItem}) => {

    const id = Cookies.get('id')
    const navigate = useNavigate()
    const [dataInput, setDataInput] = useState({
        id_penjual: '',
        nama_item: "",
        harga_item: "",
        foto_item: [],
        deskripsi_item: "",
        id_kategori: "1" ,
        stok_item: "",
        ukuran_item: [],
        warna_item: [],
        biaya_operasional: "",
        tgl_input : ""
    });
    const [warnaItem, setWarnaItem] = useState("")
    const [isWarna, setIsWarna] = useState(false)
    const tanggal = new Date()
    const [isAlert, setIsAlert] = useState(false)
    const [textAlert, setTextAlert] = useState('')
    const [isIsiWarna, setIsIsiWarna] = useState(false)
 
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

    const handleInputWarna = (e) => {
        e.preventDefault()
        setWarnaItem(e.target.value)
    }

    const handleWarna = (e) => {
        e.preventDefault()
        
        if(warnaItem === "") {
            setIsIsiWarna(true)
        } else {
            setIsWarna(true)
            const dataWarna = [...dataInput.warna_item]
            dataWarna.splice(0, 0, warnaItem)
            setDataInput((data)=>({...data, warna_item : dataWarna}))
            setWarnaItem("")
        }
    }

    const handleDeleteWarna = (e, index) => {
        e.preventDefault()
        try {
            // const dataFilter = dataInput.warna_item.filter((item) => item.index !== index)
            // console.log(dataFilter)
            setDataInput((data)=>({...data, warna_item : data.warna_item.splice(e.target.value, 1)}))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setIsIsiWarna(false)
        }, 4000)
    },[handleWarna])

    useEffect(()=>{
        setDataInput((data) => ({...data, 
            harga_item : "",
            stok_item : "",
            warna_item : [],
            ukuran_item : [],
            biaya_operasional : ""
        }))
    },[dataInput.id_kategori])

    useEffect(()=>{
        setDataInput((data)=> ({...data,
            id_penjual : id
        }))

        if(dataInput.warna_item === null) {
            setIsWarna(false)
        }

         const tgl_input = tanggal.getHours() + ':' + tanggal.getMinutes() + ' ' + tanggal.getDate() + '/' + (+tanggal.getMonth() + 1) + '/' + tanggal.getFullYear()
        
            setDataInput((data) => ({...data,
                tgl_input : tgl_input
            }))

    }, [])

    const handleBatal = () => {
        setIsUbah(false)
        setPageItem(null)
    }

    const handleDaftarPenjual = async (e) =>{
        e.preventDefault()    
        try {   
            let formData = new FormData();
            
            for (const [key, value] of Object.entries(dataInput)) {
                if (key !== 'foto_item' && key !== 'ukuran_item' && key !== 'warna_item' ) {
                    formData.append(key, value)
                }             
            }
            
            for (let i = 0; i < dataInput.foto_item.length; i++) {
                formData.append('foto_item', dataInput.foto_item[i])
            }

            for (let i = 0; i < dataInput.ukuran_item.length; i++) {
                formData.append('ukuran_item', dataInput.ukuran_item[i])
            }

            for (let i = 0; i < dataInput.warna_item.length; i++) {
                formData.append('warna_item', dataInput.warna_item[i])
            }
            
            await axios.post(`${apiHost}item`, formData);
            setIsAlert(true)
            setTextAlert('Item berhasil diinput')

            setTimeout(()=>{setPageItem(<ItemToko/>)},1500)
            
                    
            console.log(isAlert)

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
    
    // console.log('warnaItem', warnaItem)
    // console.log(dataInput)
    console.log(isAlert)

    return ( 
        <div className="">
            <p className='text-title-halaman'>Input Item</p>
            
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
                        <label htmlFor="deskripsi_item"  id='label-input'>Deskripsi</label>
                    </div>
                    <div className="col">
                        <textarea 
                            className='input-text' 
                            name="deskripsi" 
                            id="deskripsi_item"
                            style={{resize:"none", height:"100px"}}
                            value={dataInput.deskripsi_item}
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
                    <div className="col d-flex align-items-center">
                        <input
                            className='input-text'
                            style={{width:'260px'}}
                            type="text"
                            id="warna_item"
                            value={warnaItem}
                            onChange={handleInputWarna}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        />
                        <BsFillPlusSquareFill 
                            className='mx-2' 
                            color='#0E8388' 
                            size={30} 
                            style={{cursor:"pointer"}} 
                            onClick={handleWarna} 
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-4">
                        <div className="bg-warna-input p-2 ">
                            {isWarna ? dataInput.warna_item.map((item, index)=>{
                                return(
                                    <div className='row d-flex align-items-center' key={index}>
                                        <div className="col">
                                            <p  className=' m-0 text-warna-input'><BsDash className='mx-1'/>{item}</p>
                                        </div>
                                       <div className="col-3">
                                            <div style={{ cursor:"pointer", display:"inline-block" }} onClick={(e) => handleDeleteWarna(e, index)}>
                                                <RxCross2 size={20}/>
                                            </div>
                                        </div>                             
                                    </div>
                                )})  : <BsDash className='mx-1'/>}
                        </div>
                    </div>
                    <div className="col">
                        {isIsiWarna ? <p style={{color:'red'}}>*silahkan isi warna terlebih dahulu</p> : <></> }
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
            <div className="d-flex justify-content-center" >
                {isAlert ? <Alert textAlert={textAlert} isAlert={isAlert} setIsAlert={setIsAlert}/> : <div></div>}
            </div>
        </div>
     );
}
 
export default InputItem;