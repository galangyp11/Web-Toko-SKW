import React from 'react'
import { useState } from 'react';
import './profil-pembeli-admin.css'
import search from '../image/search.png'

const ProfilPenjualAdmin = () => {
    const [currentPage,setCurrentPage] = useState (1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = currentPage - recordsPerPage;
    // const records = Data.slice(firstIndex, lastIndex);
    // const npage = Math.ceil(Data.length / recordsPerPage)
    // const numbers = [...Array(npage + 1).keys()].slice(1)

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
        <div className="profil-pembeli-admin container-fluid border">
            <div className="row">
            <p className='text-title-halaman'>Profil Pembeli</p>
            </div>

            <div className="row">
                <div className="col-3 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                    <input className='search-admin p-2 ' type="text" placeholder='Search' />    
                        <div className="col-1 d-flex justify-content-center align-items-center" style={{ height:'100%'}}>
                            <div className="logo-search-admin d-flex justify-content-center">
                                <img className='p-1' src={search} alt=""/>
                            </div>
                        </div>                     
                </div>
            </div>

           <table class="table my-5 table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
            <tbody>
                    <tr>
                        <td>01</td>
                        <td>ujang@gmIL.COM</td>
                        <td>UAJNG</td>
                        <td>AWDADWAS</td>
                        <td>tambun</td>
                        <td>hapus</td>
                    </tr>
            </tbody>
            </table>
            
                <ul className='pagination border d-flex align-items-end'>
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
export default ProfilPenjualAdmin;