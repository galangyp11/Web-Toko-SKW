import './itemskeranjang.css'
import kura from '../../image/kuraplongo.jpg'
import axios from 'axios';

import { MdOutlineCancel } from "react-icons/md";

const ItemsKeranjang = ({datum}) => {

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
           await datum.forEach(item => {
                axios.delete(`http://localhost:3311/keranjang/${item.id_keranjang}`)
           });
                    
                 window.location.reload()
             console.log('udh keapus bang')
        } catch (error) {
            console.log(error)
        }
       
    }

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    return (
        datum.map((item)=>{
            return(
                <div className="items-keranjang my-3" key={item.id_keranjang}>
                    <div className="row d-flex justify-content-center align-items-center px-3" style={{height:"100%", width:"100%"}}>
                        <div className="col-2  d-flex justify-content-center align-items-center" style={{height:"100%"}}>
                            <img className='img-items-keranjang' src={kura} />
                        </div>
                        <div className="col  py-2" style={{height:"100%"}}>
                            <div className="row">
                                <p className='text-nama-item-keranjang' >{item.nama_item}</p>
                            </div>  
                        <div className="row">
                                <p>{formatUang(item.harga_item).replace(/\,00/g, '')}</p>
                        </div>
                            
                        </div>
                        <div className="col-3 ">
                            <div className="row d-flex justify-content-center">
                                <div className="col-4 ">
                                    <p>Jumlah</p>
                                </div>
                            </div>
                            <div className="row ">   
                                <div className="col  d-flex justify-content-center align-items-center">
                                    <button className='but-jumlah-keranjang '>-</button>
                                        <p 
                                            className='text-jumlah-keranjang px-3 py-2' 
                                            // placeholder={item.jumlah}
                                            // value={}
                                        >{item.jumlah}</p>
                                    <button className='but-jumlah-keranjang'>+</button>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="col-1  d-flex justify-content-center align-items-center" style={{height:"100%"}}>
                            <div onClick={handleDelete}>
                            <MdOutlineCancel size="30px" color='grey' className='but-delete-keranjang' />
                            </div>
                        </div>
                    </div>
            
                </div>
        )
    })
     );
}
 
export default ItemsKeranjang;