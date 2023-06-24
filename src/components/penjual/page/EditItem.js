import './inputitem.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { GoFileMedia } from "react-icons/go";
import apiHost from '../../../constants/apiHost';
import ItemToko from './ItemToko';
import { BsFillPlusSquareFill, BsDash } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Alert from '../../AlertHijau'

const EditItem = ({id_item, setIsUbah, setPageItem}) => {

    const [itemById, setItemById] = useState({})
    const [ukuranItemById, setUkuranItemById] = useState([])
    const [warnaItemById, setWarnaItemById] = useState([])
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
        warna_item: [],
        ukuran_item: [],
        biaya_operasional: "",
        id_foto_item_delete:[]
    });
    const tanggal = new Date()
    const [stokTambah, setStokTambah] = useState({
        id_item:'',
        id_penjual:'',
        stok_awal:'',
        stok_tambah:'',
        tanggal:''
    })
    const [kategoriById, setKategoriById] = useState('')
    const [warnaItem, setWarnaItem] = useState("")
    const [isWarna, setIsWarna] = useState(true)
    const [isIsiWarna, setIsIsiWarna] = useState(false)
    const [isChecked, setIsChecked] = useState()
    const [isAlert, setIsAlert] = useState(false)
    const [textAlert, setTextAlert] = useState('')
    

    useEffect(()=>{
        const getItemById = async () => {
            const response = await axios.get(`${apiHost}item/${id_item}`);
            setItemById(response.data);
          };
        getItemById();

        const getUkuranById = async () => {
            const response = await axios.get(`${apiHost}item-ukuran/${id_item}`);
            setUkuranItemById(response.data);
        }
        getUkuranById()

        const getWarna = async () => {
            const response = await axios.get(`${apiHost}item-warna/${id_item}`);
            setWarnaItemById(response.data);
        }
        getWarna() 
    },[])
 
    const handleInput = (e) =>{
        e.preventDefault()     
        setDataInput((data) => ({...data, 
            [e.target.id] : e.target.value,
            stok_item : +e.target.value + +itemById.stok_item
        }))

        setStokTambah((data)=>({
            ...data,
            id_item: itemById.id_item,
            id_penjual: itemById.id_penjual,
            stok_awal: itemById.stok_item,
            stok_tambah: e.target.value,
            tanggal: itemById.tanggal
        }))
    }

    useEffect(()=>{
        setDataInput((data)=> ({...data,
            id_penjual : id,
            id_item : itemById.id_item,
            nama_item: itemById.nama_item,
            harga_item: itemById.harga_item,
            deskripsi_item: itemById.deskripsi_item,
            id_kategori: itemById.id_kategori,
            stok_item: itemById.stok_item,
            biaya_operasional: itemById.biaya_operasional,
        }))

        if(itemById.id_kategori === 1){
            setKategoriById('Makanan')
        } else if(itemById.id_kategori === 2){
            setKategoriById('Minuman')
        } else if(itemById.id_kategori === 3){
            setKategoriById('Pakaian')
        } else if(itemById.id_kategori === 4){
            setKategoriById('Aksesoris')
        } else if(itemById.id_kategori === 5){
            setKategoriById('Kerajinan')
        } else if(itemById.id_kategori === 6){
            setKategoriById('jasa')
        } else {
            setKategoriById('')
        }
      
    },[itemById])

    useEffect(()=>{
        ukuranItemById.forEach(()=>{
            setDataInput((data)=>({
                ...data, 
                ukuran_item : ukuranItemById.map(ukuran => ukuran.nama_ukuran)
            }))
        })

    },[ukuranItemById])

    useEffect(()=>{
        warnaItemById.forEach((item)=>{
            setDataInput((data)=>({
                ...data,
                warna_item: warnaItemById.map(warna => warna.nama_warna)
            }))
        })
    },[warnaItemById])

    const handleDeleteFoto = (e, id) => {
        e.preventDefault()
        const dataIdFoto = [...dataInput.id_foto_item_delete]
        dataIdFoto.splice(0,0, id)
        setDataInput((data) => ({
            ...data,
            id_foto_item_delete : dataIdFoto
        }))

        const dataFilter = itemById.gambar.filter((data) => data.id_gambar !== id)
        setItemById((data) => ({
            ...data, 
            gambar: dataFilter
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

        if(e.target.id === dataInput.ukuran_item){
            setIsChecked(true)
        } else {
            setIsChecked(false)
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
            dataWarna.splice(0,0, warnaItem)
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
            // let formData = new FormData();
            
            // for (const [key, value] of Object.entries(dataInput)) {
            //     if (key !== 'foto_item' && key !== 'ukuran_item' && key !== 'warna_item' ) {
            //         formData.append(key, value)
            //     }             
            // }
            
            // for (let i = 0; i < dataInput.foto_item.length; i++) {
            //     formData.append('foto_item', dataInput.foto_item[i])
            // }

            // for (let i = 0; i < dataInput.ukuran_item.length; i++) {
            //     formData.append('ukuran_item', dataInput.ukuran_item[i])
            // }

            // for (let i = 0; i < dataInput.warna_item.length; i++) {
            //     formData.append('warna_item', dataInput.warna_item[i])
            // }

            await axios.post(`${apiHost}riwayat-item-masuk`, stokTambah);
            await axios.put(`${apiHost}item`, dataInput);
    
            setIsAlert(true)
            setTextAlert('Item berhasil diubah')
            // console.log(dataInput.ukuran_item.length)
            // console.log(formData)
            setPageItem(<ItemToko/>)
        } catch (error) {
            console.log('eror bang gabisa input', error)
        }
    }

    useEffect(()=>{
        const postRiwayat = async() => {
            await axios.post(`${apiHost}riwayat-item-masuk`, dataInput)
        }
        postRiwayat()
    },[handleDaftarPenjual])

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

    console.log({
        itemById,
        // ukuranItemById,
        stokTambah,
        warnaItemById,
        dataInput,
    })
    // console.log(id_item)
    return ( 
        <div className="edit-item">
            <p className='text-title-halaman'>Edit Item</p>
            
            <div className="form-body-penjual gap-1 d-flex justify-content-center row">
                <div className="row d-flex align-items-center">
                    <div className="col mx-5 px-4 " >
                        <input id="imageFile" type="file" style={{color:"transparent"}} multiple onChange={onChangeFile} accept='image/png' />
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-4">
                        {itemById.gambar?.map((item) => {
                            return(
                                <div className="row d-flex align-items-center my-1" style={{height:"100%"}}>
                                    <div className="col" >
                                        <div className="input-gambar-item">
                                            <img className='input-gambar-item-edit' src={`${apiHost}${item.src}`} alt="" key={item.id_gambar}/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <RxCross2 color='grey' size='30px' style={{cursor:"pointer"}} onClick={(e) =>handleDeleteFoto(e, item.id_gambar)}/>
                                    </div>
                                </div>                                    
                                )
                            })}
                            {/* <GoFileMedia color='white' size='30px'/> */}
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
                            name="deskripsi" 
                            id="deskripsi_item"
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
                        <input 
                            type="text" 
                            className='input-text'
                            placeholder={kategoriById}
                            disabled/>
                        {/* <select 
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
                        </select> */}
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
                            //value={dataInput.harga_item}
                            placeholder={itemById.harga_item}
                            onChange={handleInput}
                            disabled={dataInput.id_kategori !== "6" ? false : true}
                        />
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="stok_item"  id='label-input'>Tambah stok</label>
                    </div>
                    <div className="col d-flex" style={{ height:'90%'}}>
                        <p className='text-info-edit-item d-flex align-items-center'>{itemById.stok_item} + </p>
                        <input
                            className='input-text'
                            type="text"
                            // id="stok_item"
                            //value={dataInput.stok_item}
                            onChange={handleInput}
                            style={{width:'100px'}}
                        />
                        <p className='text-info-edit-item d-flex align-items-center' style={{marginLeft:'10px'}}> Stok item ({dataInput.stok_item})</p>
                    </div>
                    <div className="col">
                        
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col-3">
                        <label htmlFor="warna_item"  id='label-input'>Warna</label>
                    </div>
                    <div className="col">
                        <input
                            className='input-text'
                            style={{width:'260px'}}
                            type="text"
                            id="warna_item"
                            //value={dataInput.warna_item}
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
                    <div className="col">
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
                            id="XL" 
                            value="XL"
                            onChange={handleInputUkuran}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> XL
                        <br />
                        <input 
                            type="checkbox" 
                            id="L" 
                            value="L"
                            onChange={handleInputUkuran}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> L
                        <br />
                        <input 
                            type="checkbox" 
                            id="M" 
                            value="M"
                            onChange={handleInputUkuran}
                            checked={isChecked}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> M
                        <br />
                        <input 
                            type="checkbox" 
                            id="S" 
                            value="S"
                            onChange={handleInputUkuran}
                            disabled={dataInput.id_kategori === "3" || dataInput.id_kategori === "4" ? false : true}
                        /> S
                        <br />
                        <input 
                            type="checkbox" 
                            id="Semua Ukuran" 
                            value="Semua Ukuran"
                            onChange={handleInputUkuran}
                            checked={isChecked}
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
                    <button className='but-input-item-penjual' onClick={handleDaftarPenjual}>Simpan</button>
                </div>
            </div>
            <div className="d-flex justify-content-center" >
                {isAlert ? <Alert textAlert={textAlert} isAlert={isAlert} setIsAlert={setIsAlert}/> : <div></div>}
            </div>
        </div>
     );
}
 
export default EditItem;