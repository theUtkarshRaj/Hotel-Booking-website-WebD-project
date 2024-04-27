import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home/main';
import HotelScreen from './Screen/HotelScreen';
import BookingScreen from './Screen/BookingScreen';
import Register from './Screen/RegisterScreen';
import Login from './Screen/LoginScreen';
import About from './Screen/About';
import Destination from './Screen/Destination';
function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element= {<Home />} />
       <Route path='/hotel' element ={<HotelScreen/>}/>
       <Route path='/book/:roomid/:fromDate/:toDate' element={<BookingScreen/>} />
       <Route path ='/register' element ={<Register/>}/>
       <Route path='/login'   element ={<Login/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/destination' element={<Destination/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}
export default App;