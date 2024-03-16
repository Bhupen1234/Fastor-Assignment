import React, { useEffect, useState } from 'react'
import styles from "./RestaurantPage.module.css"
import { useNavigate } from 'react-router-dom'
import Wallet from "../../Icons/wallet.png"
import Offer from "../../Icons/discount.png"
import axios from 'axios'
import { Grid } from '@mui/material'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import { useSnackbar } from 'notistack'
const RestaurantPage = ({getRestaurantData}) => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [resturantData,setRestaurantData] =useState([])


    const performAPICall=async(token)=>{
       try{
        const response = await axios.get("https://staging.fastor.in/v1/m/restaurant",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return response;

        
       }

       catch(error){
           console.log(error)
       }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")===null){
        navigate('/');
       
        enqueueSnackbar('You must be logged in to access Restaurant page', { variant: "error" })
        }
        else {
             const onLoadHandler =async()=>{
                const data = await performAPICall(localStorage.getItem("token"));

                if(data){
                    setRestaurantData(data.data)
                }
               
                else{
                    
                    enqueueSnackbar('Can not fetch the restaurant data from the server', { variant: "error" })
                }

             }

             onLoadHandler();
        }


    },[])


    


    useEffect(()=>{
       console.log(resturantData)
    },[resturantData])



  return (
    <div className={styles.container}>
        <div className={styles.headerWrapper}>

       
        <div className={styles.user}>
            <div style={{width:"50vw", height:"200px",backgroundColor:"rgb(250,250,250)",borderRadius:"20px"}}>
            <h1 style={{margin:"10px",fontSize:"2.5rem",color:"rgb(139,156,168)"}}>{localStorage.getItem("userName")}</h1>
            <h2 style={{margin:"10px", fontWeight:"bold"}}>Let's Explore this evening</h2>
            </div>
            
        </div> 

        <div className={styles.icons}>
            <div className={styles.offers}>
               <img src={Offer} alt="offer%" style={{cursor:'pointer'}}/>
               <h3 style={{textAlign:"center",color:"rgb(139,156,168)"}}>Offers</h3>
            </div>
            <div className={styles.wallet}>

               
                <img src={Wallet} alt="wallet" style={{cursor:'pointer'}}/>
                <h3 style={{textAlign:"center",color:"rgb(139,156,168)"}}>Wallet</h3>
            </div>
           
        </div>
        </div>
        <div className={styles.popularRestaurants}>
         <h1>Popular Ones</h1>
            <Grid container spacing={2}>
                {
                    resturantData.map((item,index)=>{
                        return(
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <RestaurantCard resturantData={item} getRestaurantData={getRestaurantData}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    </div>
  )
}

export default RestaurantPage
