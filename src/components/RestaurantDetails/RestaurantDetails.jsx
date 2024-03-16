import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from "./RestaurantDetails.module.css"
import Star from "../../Icons/Star.png"
import trendingOffer from "../../Icons/trendingOffer.png"
import { useSnackbar } from 'notistack'
const RestaurantDetails = ({restaurantData}) => {
    const navigate= useNavigate()

    const enqueueSnackbar = useSnackbar()


 


    


   
    useEffect(()=>{
      if(localStorage.getItem("token")===null){
        
        enqueueSnackbar('You must be logged in to access Restaurant page', { variant: "error" })

          navigate("/");
      }

   },[])


  return (
    <>
    {
       
  
    
<div className={styles.container}>
<div className={styles.content}>
  <div className={styles.restaurant_address_rating}>
    <div>
    <h2>{restaurantData.restaurant_name}</h2>
  <h3 >{restaurantData.location!==null? restaurantData.location.location_address : "B-6/2, Model Town 1, Model Town Phase I, Mukherjee Nagar, New Delhi, Delhi 110009"}</h3>
    </div>
    <div style={{display:"flex",alignItems:"center"}}>
    <img src={Star} alt="offer%" style={{display:"inline"}}/>{" "}<p  style={{display:"inline"}}>{restaurantData.rating.restaurant_avg_rating}</p>
    </div>
  
</div>

<img src={trendingOffer} alt="offer%" style={{display:"inline"}}/>{" "}<p  style={{display:"inline",color:"var(--color-primary)",fontWeight:"bolder" ,}}>4 offers trending</p>

<div className={styles.restaurantDetails}>
    <p style={{color:"rgb(139,156,168)"}}>Our delicate vanilla cake swirled with chocolate and filled with mocha chocolate chip cream and a layer of dark chocolate ganache</p>
</div>
</div>



 </div>
 
}
</>
   
  )
}

export default RestaurantDetails
