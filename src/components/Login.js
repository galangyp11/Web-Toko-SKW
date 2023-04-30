import './login.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [ inputUser, setInputUser ] = useState({
        emailInput : "",
        passwordInput : ""
      });

    const navigate = useNavigate()

    const [dataLoginAdmin, setDataLoginAdmin] = useState([]);
    const [dataLoginPembeli, setDataLoginPembeli] = useState([]);
    const [dataLoginPenjual, setDataLoginPenjual] = useState([]);

    const [getUrl, setGetUrl] = useState('');

    useEffect(() => {
        const getAdminById = async () => {
            const response = await axios.get(`http://localhost:3311/admin`);
            setDataLoginAdmin(response.data);
            console.log(response.data);
        }
        getAdminById();

        const getPembeliById = async () => {
            const response = await axios.get(`http://localhost:3311/pembeli`);
            setDataLoginPembeli(response.data);
            console.log(response.data);
        }
        getPembeliById();

        // const getPenjualById = async () => {
        //     const response = await axios.get(`http://localhost:3311/penjual/${id}`);
        //     setDataLoginPenjual(response.data);
        //     console.log(response.data);
        // }
        // getPenjualById();
                
    }, []);

    useEffect(()=>{
        dataLoginPembeli.map((data)=>{
            if(data.email === inputUser.emailInput && data.password === inputUser.passwordInput && data.level == "Pembeli"){
                setGetUrl(`/Pembeli/${data.id_pembeli}`)
            }else{
                dataLoginAdmin.map((data)=>{
                    if(data.email === inputUser.emailInput && data.password === inputUser.passwordInput && data.level == "Admin"){
                        setGetUrl(`/Admin/${data.id_admin}`)
                    }else{
                        console.log('modar')
                    }
                })
            }
        })
    }, [inputUser])

    const handleInput = (e) => {
        e.preventDefault();
        setInputUser((data) => ({
            ...data,
            [e.target.id]: e.target.value
        }));
    };

    const handleLogin = () =>{
        navigate(getUrl)
        console.log(getUrl)
    };

 
    return ( 
        <div className="login">
            <div className="test-form ">
          <div className="row ">
            <div className="col-2 mx-5 my-1 d-flex justify-content-center">
                <label htmlFor="emailInput">Username</label>
            </div>
            <div className="col my-1">
                <input 
                    type="text" 
                    id="emailInput"
                    value={inputUser.emailInput}
                    onChange={handleInput}
                />
            </div>

            <div className="col-2 mx-5 my-1 d-flex justify-content-center">
                <label htmlFor="passwordInput">Password</label>
            </div>
            <div className="col my-1 ">
                <input 
                    type="password" 
                    id="passwordInput"
                    value={inputUser.passwordInput}
                    onChange={handleInput}
                />  
            </div>

           
          </div>     
          <div className="row  mt-5">
            <div className="col d-flex justify-content-center">
            <button type='button' className='btn btn-primary ' onClick={handleLogin}>Login</button>
            </div>
            </div>
        </div>
        </div>
     );
}
 
export default Login;