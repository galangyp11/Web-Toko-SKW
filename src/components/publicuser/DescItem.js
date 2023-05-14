import './descitem.css'
import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const DescItem = () => {

    const [itemById, setItemById] = useState({});
    const [foto, setFoto] = useState();
    const id_pembeli = Cookies.get('id')
    const {id} = useParams();
    const [dataItem, setDataItem] = useState({
        id_pembeli:'',
        id_item: '',
        jumlah: '1'
    })

    useEffect(() => {
        const getItemById = async () => {
            const response = await axios.get(`http://localhost:3311/item/${id}`);
            setItemById(response.data);
        }
        getItemById();

        window.scrollTo(0, 0);

        setDataItem((data) => ({...data,
            id_pembeli : id_pembeli,
            id_item : id
        }))
                
    }, []);

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    setTimeout(()=>{
        try {
            setFoto(btoa(String.fromCharCode(...new Uint8Array(itemById.foto_item.data))))
        } catch (error) {
            console.log('sabar bang fotonya lagi loading')
        }
    }, 100)

    const handleKeranjang = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3311/keranjang`, dataItem);
            alert('udh di keranjang bng');
            console.log('bisa kog')
        } catch (error) {
            console.log('eror bang gabisa input')
        }
    }
    console.log(dataItem)

    return ( 
        <div className="descitem">
            <div className="desc-item-con container ">
                <div className="row pt-4" style={{ overflow:"hidden"}}>
                    <div className="col d-flex justify-content-center">
                        <div className="desc-kiri">
                            
                            <img className='item-desc-image' src={`data:image/png;base64,${foto}`} alt=""/>
                        </div>
                    </div>

                    <div className="col">
                        <div className="desc-kanan p-4">
                            <div className="row">
                                <h2>{itemById.nama_item}</h2>
                            </div>
                            <div className="row">
                                <h4>{formatUang(itemById.harga_item).replace(/\,00/g, '')}</h4>
                            </div>
                            <div className="row">
                                <p>{itemById.deskripsi_item}</p>
                            </div>
                            <div className="row d-flex justify-content-end align-items-end" style={{height:"80%"}}>
                                <div className="but-cart" onClick={handleKeranjang}>
                                    <h6 className='text-but-cart d-flex justify-content-center align-items-center' >Tambahkan ke Keranjang</h6>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default DescItem;