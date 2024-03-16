import logo from './logo.svg';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import RestaurantPage from './components/RestaurantPage/RestaurantPage';
import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails';
import { useEffect, useState } from 'react';

function App() {

  const [restaurantData ,setRestaurantData ] = useState([]);
  const getRestaurantData =(data)=>{
    setRestaurantData(data);
  }


 useEffect(()=>{
  console.log(restaurantData);
 },[restaurantData])
 
  return (
    <div className="App">
     <Routes>
         <Route path="/" element={<Register/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/restaurant" element={<RestaurantPage getRestaurantData={getRestaurantData}/>}/>
         <Route path="/restaurantDetail" element={<RestaurantDetails restaurantData={restaurantData}/>}/>
     </Routes>

      {/* <Register/> */}
     
    </div>
  );
}

export default App;
