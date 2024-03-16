import React from 'react'
import styles from "./RestaurantCard.module.css"
import { Card, CardContent, Grid, Typography, stepButtonClasses } from '@mui/material';
import trendingOffer from "../../Icons/trendingOffer.png"
import { useNavigate } from 'react-router-dom';
const RestaurantCard = ({resturantData,getRestaurantData}) => {
  const navigate = useNavigate()
  const {restaurant_id,avg_cost_for_two,restaurant_name,rating,images,location,currency}  = resturantData;
  const handleClick = (item) => {
    navigate(`/restaurantDetail`);
    getRestaurantData(item)
}
 
  return (
    <Card
    variant="outlined"
    sx={{ bgcolor: "transparent", my: 3, border: "none",cursor:"pointer" ,transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)", // Scale up on hover
    },}}
   onClick={()=>handleClick(resturantData)}
  

  >
    <CardContent sx={{ p: 0, position: "relative" }} >
        <div className={styles.cardContent}>
            <div className={styles.cardImage}>
                <img src={images[0].url} alt="restaurant" style={{ width: '100%', height: 'auto' }}/>
            </div>
            <div className={styles.cardText}>
            <h2>{restaurant_name}</h2>
            <p>{location!==null? location.location_address : "B-6/2, Model Town 1, Model Town Phase I, Mukherjee Nagar, New Delhi, Delhi 110009"}</p>
            <div className={styles.trendingOffer}>
             <img src={trendingOffer} alt="offer%" style={{display:"inline"}}/>{" "}<p  style={{display:"inline",color:"var(--color-primary)",fontWeight:"bolder"}}>4 offers trending</p>
            </div>
              <div className={styles.ratingCost}>
                  <div className={styles.rating}>
                    <h4>★ {rating.restaurant_avg_rating}</h4>
                    <p>Popularity</p>
                  </div>
                  <div className={styles.cost}>
                     <h4>{currency.symbol} {avg_cost_for_two}</h4>
                     <p>Cost for two</p>
                  </div>
              </div>
            </div>
            
        </div>
    </CardContent>
    </Card>
  )
}

export default RestaurantCard
