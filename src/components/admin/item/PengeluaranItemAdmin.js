import { useState, useEffect } from 'react';
import './profilpembeliadmin.css'
import search from '../../image/search.png'
import axios from 'axios';
import apiHost from '../../../constants/apiHost'

const ProfilPenjualAdmin = () => {
    const [datumItem, setDatumItem] = useState([])

    const [currentPage,setCurrentPage] = useState (1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = currentPage - recordsPerPage;

    useEffect(()=>{
        const getDatumItem = async() => {
            const response = await axios.get(
                `${apiHost}riwayat-item-keluar?page=${currentPage}&limit=${recordsPerPage}`
            )
            setDatumItem(response.data)
        }
        getDatumItem()
    },[currentPage])

    const handleDelete = async(e, id) =>{
        e.preventDefault()
        await axios.delete(`${apiHost}item/${id}`);
        const dataFillter = datumItem.filter((item) => item.id_item !== id);
        setDatumItem(dataFillter);
      }

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    console.log('item keluar',datumItem)

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

     const onSearchItem = async ({  target: { value } }) => {
        console.log('val', value)
        const response = await axios.get(`${apiHost}riwayat-item-keluar?search=${value}`)
        setDatumItem(response.data)
     }
    return ( 
        <div className="pemasukan-item-admin container-fluid">
        <div className="row">
           <p className='text-title-halaman'>Riwayat Item Keluar</p>
       </div>

       <div className="row">
           <div className="col-3 d-flex justify-content-center align-items-center " style={{ height:'100%'}}>
               <input className='search-admin p-2 ' type="text" placeholder='Search' onChange={onSearchItem}/>    
                   <div className="col-1 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                       <div className="logo-search-admin d-flex justify-content-center">
                           <img className='p-1' src={search} alt=""/>
                       </div>
                   </div>                     
           </div>
       </div>

      <table className="table my-5 table-bordered">
           <thead className="table-dark">
               <tr>
                   <th className='col-1 text-center' scope="col">No</th>
                   <th className='col-2' scope="col">Username</th>
                   <th className='col-2' scope="col">Nama Item</th>
                   <th className='col-1' scope="col">Jumlah</th>
                   <th className='col-2' scope="col">Toko</th>
                   <th className='col-1' scope="col">Stok Awal</th>
                   <th className='col-1' scope="col">Sisa Stok</th>
                   <th className='col-2' scope="col">Tanggal</th>
               </tr>
           </thead>
       <tbody>
           {datumItem.map((item, index)=>{
               return(
               <tr key={item.transaksi}>
                   <td className='text-center'>{index+1}</td>
                   <td>{item.username}</td>
                   <td>{item.nama_item}</td>
                   <td className='text-jumlah-beli'>{item.jumlah_beli}</td>
                   <td>{item.nama_toko}</td>
                   <td>{+item.stok_item + +item.jumlah_beli}</td>
                   <td>{item.stok_item}</td>
                   <td>{item.tanggal}</td>
               </tr>
               )
           })} 
       </tbody>
       </table>
       
       <ul className='pagination d-flex justify-content-center'>
          <li className='page-item'>
            <a href="#" className='page-link' onClick={prePage}>Prev</a>
          </li>
                  
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>Next</a>
          </li>
      </ul>
   </div>
     );
}
 
export default ProfilPenjualAdmin;