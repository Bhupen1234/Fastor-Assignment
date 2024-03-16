import React, { useEffect, useState } from 'react'
import styles from "./Login.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
const Login = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const [loader,setLoader]=useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
       if(localStorage.getItem("mobileNumber")===null){
        navigate('/')
       }
    },[])


   

    const handleChange =(index,value)=>{
        
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
       
        const enteredOtp = otp.join('');
        
        await verifyOTP(enteredOtp);
        
      };


    const verifyOTP = async(enteredOtp)=>{

        try {
            setLoader(true)
            const response = await axios.post('https://staging.fastor.in/v1/pwa/user/login',{
            phone : window.localStorage.getItem("mobileNumber"),
            otp :Number(enteredOtp),
            dial_code:"+91"
            })
            console.log(response.data.token)

            if(response.data.status_code === 200){
                 window.localStorage.setItem("token",response.data.data.token);
                 window.localStorage.setItem("userId",response.data.data.user_id);
                 window.localStorage.setItem("userName",response.data.data.user_name);
                navigate("/restaurant");
            }
            else {
            alert(response.data.error_message);
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log(error.response.data)
        }
        

        
    }

  return (
    <div>
        <div className={styles.container}>
    
    <div className={styles.form}>
      <h2 >OTP Verification</h2>
      <p style={{color:"rgba(131, 139, 161, 1)"}}>Enter the verification code we just sent on your Mobile Number.</p>
      <form onSubmit={handleSubmit}>
      <div className={styles.otpInput}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                onChange={(e) =>  handleChange(index, e.target.value)}
                style={{width:"40px",height:"60px"}}
                value={digit}
                required
              />
            ))}
          </div>
        <button type="submit">{loader?"Verifing..." : "Verify"}</button>
      </form>
    </div>
  </div>
    </div>


  )
}

export default Login
