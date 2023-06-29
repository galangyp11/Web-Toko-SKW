import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FormHal1 = ({dataInput, setDataInput, handleNext}) => {
    const navigate = useNavigate()
    const [typePassword, setTypePassword] = useState("password")
    const [isHiddenPass, setIsHiddenPass] = useState(false)
    const [dataHal, setDataHal] = useState({
        email:'',
        password:''
    })

    const handleInput = (event) =>{
        setDataHal((data) => ({...data, 
            [event.target.id] : event.target.value
        }))
    }
    
    useEffect(()=>{
        setDataInput((data) => ({
            ...data,
            email : dataHal.email,
            password : dataHal.password
        }))
    },[dataHal])

    const handleHiddenPass = (e) => {
        e.preventDefault()
        setIsHiddenPass(false)
       setTypePassword("password")
    }

    const handleShowPass = (e) => {
        e.preventDefault()
        setIsHiddenPass(true)
        setTypePassword("text")
    }

    return ( 
        <div className="form-hal1 d-flex justify-content-center row" style={{ height:"300px"}}>
            <div className="row d-flex justify-content-center">
                            <label htmlFor="email"  id='label-input'>Email</label>
                            <input
                                className='input-text'
                                type="text"
                                placeholder='Masukan email anda...'
                                id="email"
                                value={dataHal.email}
                                onChange={handleInput}
                                autoFocus
                            />
                        </div>

                        <div className="row d-flex mb-5 justify-content-center">
                            <label htmlFor="password" id='label-input'>Password</label>
                            <div className="row">
                                <div className="col">

                                </div>
                                <div className="col"></div>
                            </div>
                            <input 
                                className='input-text mx-2'
                                type={typePassword} 
                                placeholder='Masukan password anda...'
                                id="password"
                                value={dataHal.password}
                                onChange={handleInput}
                            />
                            <div className="lihat-password">
                                {isHiddenPass ? <BsEyeFill size='1.2em' color='#0E8388' onClick={handleHiddenPass} style={{cursor:"pointer"}}/> 
                                : <BsEyeSlashFill size='1.2em' color='#0E8388' onClick={handleShowPass} style={{cursor:"pointer"}}/>}
                            </div>
                        </div>

                    <div className="form-footer-penjual mt-5 d-flex justify-content-center align-items-end">
          
                        <div className=" d-flex justify-content-end">
                           
                        </div>
                    </div>
        </div>
     );
}
 
export default FormHal1;