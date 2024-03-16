

import React, { useState } from 'react'
import styles from './Register.module.css'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const Register = () => {
   const [mobileNumber,setMobileNumber] = useState();
   const navigate = useNavigate();

   const [loader,setLoader]=useState(false)

   const handleregister = async(e)=>{
      e.preventDefault();

      await generateOTP(mobileNumber)


   }


   const generateOTP = async(number)=>{
    try {
        setLoader(true);
        const response = await axios.post('https://staging.fastor.in/v1/pwa/user/register',{
            phone : Number(number),
            dial_code : "+91"
        })

        if(response.data.status==="Success"){
            setLoader(false);
            window.localStorage.setItem("mobileNumber",number)
            navigate('/login')
        }
        setLoader(false)
        console.log(response)
      } catch (error) {
        setLoader(false)
         console.log(error)
      }
   }


  return (
    <div className={styles.container}>
    
      <div className={styles.form}>
        <h2 >Enter Your Mobile Number</h2>
        <p style={{color:"rgba(131, 139, 161, 1)"}}>We will send you the 4 digit verification code</p>
        <form onSubmit={async(e)=>await handleregister(e)}>
          <input 
            type="text" 
            minLength={10}
           maxLength={10}
            onChange={(e) => setMobileNumber(e.target.value)} 
            placeholder="Enter Your Mobile Number" 
            required 
          />
          <button type="submit" >{loader? "Sending": "Send Code"}</button>
        </form>
      </div>
    </div>
  )
}

export default Register
