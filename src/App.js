import logo from './logo.svg';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <Routes>
         <Route path="/" element={<Register/>}/>
         <Route path="/login" element={<Login/>}/>
     </Routes>

      {/* <Register/> */}
     
    </div>
  );
}

export default App;
