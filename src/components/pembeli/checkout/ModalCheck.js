import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const ModalCheck = ({show, setShow, dataInput}) => {
    
    const [dataMp, setDataMp] = useState({});

    const handleTutup = () => {
        setShow(false)
    }

    // useEffect(() => {
    //     const getMp = async () => {
    //         const response = await axios.get(`http://localhost:3311/metodepembayaran`)
    //         setDataMp(response.data)
    //     }
    //     getMp()
    // },[])

    console.log(dataMp)
    
    return (
            <Modal className=" modal-lg" show={show} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    
                   
                      
                            <div className="modal-header">
                                <p className="modal-title" id="staticBackdropLabel">Pembayaran</p>
                            </div>
                        <div className="modal-body d-flex justify-content-center" style={{height:"50dvh"}}>
                            <div className="row container d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <p className='text-mp-modal'>DANA 081211139102</p>
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
                                        <p className='text-info-modal'>Rp. 69.000</p>
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
                                        <p className='text-info-modal'>s</p>
                                    </div>
                                </div>

                                <div className="row d-flex align-items-end">
                                    <p className='text-info-modal'>Lakukan pembayaran transfer dengan ke nomor diatas. Pastikan kembali sebelum transfer. <br />Halaman akan otomatis tertutup dalam 10 menit</p>
                                </div>
                            </div>

                        </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <div className="row">
                                    <p>10:00</p>
                                </div>
                                <div className="row ">
                                    <p onClick={handleTutup}>Close</p>
                                </div>
                            </div>
                   
              
            </Modal>
     );
}
 
export default ModalCheck;