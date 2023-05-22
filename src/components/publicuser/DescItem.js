import './descitem.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import apiHost from '../../constants/apiHost';

const DescItem = () => {

    const [itemById, setItemById] = useState({});
    const [cekItemKeranjang, setCekItemKeranjang] = useState([]);
    const [idItemKeranjang, setIdItemKeranjang] = useState();
    const [foto, setFoto] = useState();
    const id_pembeli = Cookies.get('id');
    const {id} = useParams();
    const [dataItem, setDataItem] = useState({
        id_pembeli:'',
        id_item: '',
        jumlah: '1'
    });

    useEffect(() => {
        const getItemById = async () => {
            const response = await axios.get(`${apiHost}item/${id}`);
            setItemById(response.data);
        }
        getItemById();

        const getKeranjang = async () => {
            const response = await axios.get(`${apiHost}keranjang/${id_pembeli}`);
            setCekItemKeranjang(response.data)
        }
        getKeranjang()

        window.scrollTo(0, 0);
        setDataItem((data) => ({...data,
            id_pembeli : id_pembeli,
            id_item : id
        }))                
    }, []);

    const handleKeranjang = async (e) => {
        e.preventDefault()
        
            if(id_pembeli === undefined){
                alert('Login dulu bre')
            } else if(idItemKeranjang === itemById.id_item){   
                alert('Item sudah ada di Keranjang !')
            } else {
                try {
                    await axios.post(`http://localhost:3311/keranjang`, dataItem);
                    alert('Item Masuk ke keranjang :)');
                    window.location.reload()
                    console.log('bisa kog')
                } catch (error) {
                    console.log('eror bang gabisa input')
                }
            }        
    }

    useEffect(()=>{
        cekItemKeranjang.map((data)=>{
            setIdItemKeranjang(data.id_item)
        })
    },[handleKeranjang])

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    // setTimeout(()=>{
    //     try {
    //         setFoto(btoa(String.fromCharCode(...new Uint8Array(itemById.foto_item.data))))
    //     } catch (error) {
    //         console.log('sabar bang fotonya lagi loading')
    //     }
    // }, 100)    
    // console.log(idItemKeranjang)
    // console.log(cekItemKeranjang)
    console.log(itemById)

    return ( 
        <div className="descitem">
            <div className="desc-item-con container ">
                <div className="row pt-4" style={{ overflow:"hidden"}}>
                    <div className="col d-flex justify-content-center">
                        <div className="desc-kiri">
                            
                            <img className='item-desc-image' src={`${itemById.gambar}`} alt=""/>
                        </div>
                    </div>

                    <div className="col border">
                        <div className="desc-kanan py-2 px-3 border">
                            <div className="">
                                <p className='text-item-name-desc'>{itemById.nama_item}</p>
                            </div>
                            <div className="">
                                <p className='text-item-price-desc'>{formatUang(itemById.harga_item).replace(/\,00/g, '')}</p>
                            </div>

                            <hr />
                            <div className="desc-item border">
                                <p className='text-desc-item-desc'>{itemById.deskripsi_item}</p>
                            </div>
                            <div className="row desc-item-toko border">
                                <div className="col-2 border">
                                    <img src="" />
                                </div>
                                <div className="col border">

                                </div>
                            </div>
                            <div className="d-flex justify-content-end border align-items-end" style={{height:'50dvh'}}>
                                <button className='but-cart' onClick={handleKeranjang}>Tambah ke Keranjang</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default DescItem;