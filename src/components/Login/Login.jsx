import React, { useState } from 'react'
import styles from "./Login.module.css"
import axios from 'axios';
const Login = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const [loader,setLoader]=useState(false)


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
            console.log(response.data)

            if(response.data.status === "Success"){
                 window.localStorage.setItem("token",response.data.token);
                 window.localStorage.setItem("userId",response.data.user_id);
                 window.localStorage.setItem("userName",response.data.user_name);
                
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
                onChange={async(e) => await handleChange(index, e.target.value)}
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
