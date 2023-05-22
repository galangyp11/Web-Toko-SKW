import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalCheck = ({show, setShow, dataInput, totalHarga}) => {
    
    const [dataMp, setDataMp] = useState({});
    const id = dataInput.id_mp
    const navigate = useNavigate()

    const handleTutup = () => {
        setShow(false)
        navigate('/')
    }

    useEffect(() => {
        const getMp = async () => {
            const response = await axios.get(`http://localhost:3311/metode_pembayaran/${id}`)
            setDataMp(response.data)
        }
        getMp()
    },[id])

    const formatUang = (number) =>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
    
    return (
            <Modal className=" modal-lg" show={show} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                
                <div className="modal-header">
                    <p className="modal-title" id="staticBackdropLabel">Pembayaran</p>
                </div>
                <div className="modal-body d-flex justify-content-center" style={{height:"50dvh"}}>
                    <div className="row container d-flex justify-content-center">
                        <div className="d-flex justify-content-center">
                            <p className='text-mp-modal'>{dataMp.nama_mp} {dataMp.no_mp}</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p className="text-mp-nama-modal">A/N ADMIN SUPRI</p>
                        </div>

                        <div className="row mt-5">
                            <div className="col-3">
                                <p className='text-info-modal'>Total Harga</p>
                            </div>
                            <div className="col-1">
                                <p className='text-info-modal'>:</p>
                            </div>
                            <div className="col">
                                <p className='text-info-modal'>{formatUang(totalHarga).replace(/\,00/g, '')}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <p className='text-info-modal'>Metode Pembayaran</p>
                            </div>
                            <div className="col-1">
                                <p className='text-info-modal'>:</p>
                            </div>
                            <div className="col">
                                <p className='text-info-modal'>{dataMp.nama_mp}</p>
                            </div>
                        </div>

                        <div className="row d-flex align-items-end">
                            <p className='text-info-modal'>Lakukan pembayaran transfer dengan ke nomor diatas. Pastikan kembali sebelum transfer. <br />Halaman akan otomatis tertutup dalam 10 menit</p>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <div className="row " style={{width:'100%'}}>
                        <div className="col">

                        </div>
                        <div className="col d-flex justify-content-center">
                            <p>10:00</p>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <p onClick={handleTutup}>Sudah Bayar</p>
                        </div>
                        
                    </div>
                    <div className="row ">
                        
                    </div>
                </div>
                   
            </Modal>
     );
}
 
export default ModalCheck;