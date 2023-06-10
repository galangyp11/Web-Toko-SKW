import { useState, useEffect } from 'react';
import './profilpembeliadmin.css'
import search from '../../image/search.png'
import axios from 'axios';
import apiHost from '../../../constants/apiHost'

const PemasukanItemAdmin = () => {

    const [datumItem, setDatumItem] = useState([])

    const [currentPage,setCurrentPage] = useState (1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = currentPage - recordsPerPage;

    useEffect(()=>{
        const getDatumItem = async() => {
            const response = await axios.get(`${apiHost}riwayat-item-masuk`)
            setDatumItem(response.data)
        }
        getDatumItem()
    },[])

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

    console.log(datumItem)

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
    return ( 
        <div className="pemasukan-item-admin container-fluid">
             <div className="row">
                <p className='text-title-halaman'>Riwayat Item Masuk</p>
            </div>

            <div className="row">
                <div className="col-3 d-flex justify-content-center align-items-center " style={{ height:'100%'}}>
                    <input className='search-admin p-2 ' type="text" placeholder='Search' />    
                        <div className="col-1 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                            <div className="logo-search-admin d-flex justify-content-center">
                                <img className='p-1' src={search} alt=""/>
                            </div>
                        </div>                     
                </div>
                <div className="col  d-flex justify-content-end">
                    <p className='teks-info-stok-masuk lh-1' style={{color:"grey"}}> Stok dengan warna hijau = penambahan stok <br /> Stok dengan warna hitam = jumlah awal stok</p>
                </div>
            </div>

           <table class="table my-5 table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th className='col-1 text-center' scope="col">No</th>
                        <th className='col-3' scope="col">Nama Item</th>
                        <th className='col-1' scope="col">Harga</th>
                        <th className='col-2' scope="col">Toko</th>
                        <th className='col-1' scope="col">Stok</th>
                        <th className='col-2' scope="col">Tanggal</th>
                    </tr>
                </thead>
            <tbody>
                {datumItem.map((item, index)=>{
                    return(
                    <tr key={item.id_item}>
                        <td className='text-center'>{index+1}</td>
                        <td>{item.nama_item}</td>
                        <td>{formatUang(item.harga_item).replace(/\,00/g, '')}</td>
                        <td>{item.nama_toko}</td>
                        <td>{item.stok_item}</td>
                        <td>{item.tgl_input}</td>
                    </tr>
                    )
                })}
                    
            </tbody>
            </table>
            
                <ul className='pagination d-flex align-items-end'>
                    <li className='page-item'>
                        <a href="#" className='page-link' onClick={prePage}>Prev</a>
                    </li>
                        {/* <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a href="#" className='page-link' onClick={changeCpage}>{n}</a>
                        </li>     */}

                    <li className='page-item'>
                        <a href="#" className='page-link' onClick={nextPage}>Next</a>
                    </li>
                </ul>
        </div>
     );
}
 
export default PemasukanItemAdmin;