import './itemtoko.css'
import search from '../../image/search.png'

import InputItem from './InputItem'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import apiHost from '../../../constants/apiHost'
import EditItem from './EditItem'

const ItemToko = () => {
    const [datumItem, setDatumItem] = useState([])
    const [isUbah, setIsUbah] = useState(false)
    const [pageItem ,setPageItem] = useState(null)
    const id = Cookies.get('id')

    useEffect(()=>{
        const getDatumItem = async() => {
            const response = await axios.get(`${apiHost}item-penjual/${id}`)
            setDatumItem(response.data)
        }
        getDatumItem()
    },[setDatumItem])

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    console.log(datumItem)

    const handleTambah = () => {
        setIsUbah(true)
        setPageItem(<InputItem setIsUbah={setIsUbah} setPageItem={setPageItem}/>)
    }

    const handleEdit = (e, id_item) => {
        e.preventDefault()

        setIsUbah(true)
        setPageItem(<EditItem id_item={id_item} setIsUbah={setIsUbah} setPageItem={setPageItem}/>)
    }

    const handleDelete = async(e, id) =>{
        e.preventDefault()
        await axios.delete(`${apiHost}item/${id}`);
        const dataFillter = datumItem.filter((item) => item.id_item !== id);
        setDatumItem(dataFillter);
    }

    // useEffect(()=>{
    //     setPageItem(<ItemToko setPageItem={setPageItem}/>)
    // },[])
    

    return ( 
        <div className="container">
        {!isUbah ?
        <div>
        <div className="row">
            <p className='text-title-halaman'>Item SKW</p>
        </div>

        <div className='item-toko container p-4'>
        <div className="row">
            <div className="col-3 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                <input className='search-admin p-2 ' type="text" placeholder='Search' />    
                    <div className="col-1 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                        <div className="logo-search-admin d-flex justify-content-center">
                            <img className='p-1' src={search} alt=""/>
                        </div>
                    </div>                     
            </div>

            <div className="col d-flex justify-content-end align-items-center">
                <button className='but-input-item-penjual' onClick={handleTambah}>Tambah Item</button>
            </div>
        </div>

       <table className="table table-hover my-5">
            <thead className="table-dark">
                <tr>
                    <th className='col-1 text-center' scope="col">No</th>
                    <th className='col-3' scope="col">Nama Item</th>
                    <th className='col-1' scope="col">Kategori</th>
                    <th className='col-1' scope="col">Harga</th>
                    <th className='col-1' scope="col">Stok</th>
                    <th className='col-2 text-center' scope="col" colSpan='2'>Aksi</th>
                </tr>
            </thead>
        <tbody className='table-group-divider'>
            {datumItem.map((item, index)=>{
                return(
                    <tr key={item.id_item}>
                        <td className='text-center'>{index+1}</td>
                        <td>{item.nama_item}</td>
                        <td>{item.nama_kategori}</td>
                        <td>{formatUang(item.harga_item).replace(/\,00/g, '')}</td>
                        <td>{item.stok_item}</td>
                        <td style={{textAlign:"center"}}>
                            <button className="btn btn-warning but-tolak-pesanan" onClick={(e)=>handleEdit(e, item.id_item)}>Edit</button>    
                        </td>
                        <td style={{textAlign:"center"}}>
                            <button className="btn btn-danger but-tolak-pesanan" onClick={(e)=>handleDelete(e, item.id_item)}>Hapus</button>    
                        </td>
                    </tr>
                )
            })}
                
        </tbody>
        </table>
        </div>
        </div>
            : pageItem}
    </div> 
        
     );
}
 
export default ItemToko;