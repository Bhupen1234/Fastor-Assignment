import React, { useEffect, useRef, useState } from 'react'
import styles from "./Login.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import { useSnackbar } from 'notistack';

const Login = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const { enqueueSnackbar } = useSnackbar();

    const [loader,setLoader]=useState(false)
    const navigate = useNavigate();
    const otpInputs = useRef([]);

    useEffect(()=>{
       if(localStorage.getItem("mobileNumber")===null){
        enqueueSnackbar('Please Enter the mobile number first', { variant: "warning" })

        navigate('/')
       }
    },[])


   

    const handleChange =(index,value)=>{
        
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < otp.length - 1 && value.length === 1) {
              otpInputs.current[index + 1].focus();
          }
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
           

            enqueueSnackbar(response.data.error_message, { variant: "error" })
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
                ref={(input) => (otpInputs.current[index] = input)} 
                required
              />
            ))}
          </div>
        <button type="submit">{loader?"Verifing..." : "Verify"}</button>

      </form>
      <p style={{fontWeight:"bolder"}}>Didn’t received code? <span style={{color:"#5574c6",cursor:"pointer"}} onClick={()=>navigate("/")}>Resend</span></p>
    </div>
  </div>
    </div>


  )
}

export default Login
