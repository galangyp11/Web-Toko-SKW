import { useEffect } from 'react';
import './alert.css'
import { Modal } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";

const Alert = ({textAlert, isAlert, setIsAlert}) => {

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setIsAlert(false)
    //     },1000)
    // },[])

    return (
        <Modal className='modal-alert' show={isAlert} backdrop={false} animation={true} size='md'>
            <div className="row bg-alert-kuning">
                <div className="col">
                    <p className="text-alert-kuning d-flex justify-content-center align-items-center ">{textAlert}</p>
                </div>
                <div className="col-1 d-flex align-items-center" onClick={()=>setIsAlert(false)}>
                    <IoIosClose size={30}/>
                </div>
            </div>
        </Modal>
     );
}
 
export default Alert;