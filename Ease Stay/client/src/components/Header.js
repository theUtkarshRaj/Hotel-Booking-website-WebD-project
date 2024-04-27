import React, { useState } from 'react';
import VerticalNav from './VerticalNav';
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  function logout(){
    localStorage.removeItem('currentUser');
    window.location.href='/login'
  }
  const [isVerticalNavVisible, setIsVerticalNavVisible] = useState(false);

  const handleMenuClick = () => {
    setIsVerticalNavVisible(!isVerticalNavVisible);
  };

  const handleCloseClick = () => {
    setIsVerticalNavVisible(false);
  };

  return (
    <>
      <div className='px-3 ms:px-2 py-1 flex justify-between bg-slate-200 shadow-md '>
        <img className='w-1/12 md:2/12 px-4 sm:px-1 md:px-2 sm:w-1/5' src='./images/logo.png'/>


        <div className="flex gap-8 px-2 py-2 font-bold text-xl md:text-base sm:text-xs md:gap-3 text-first middle">
          <Link className=" hover:border-b-2 hover:border-secondary" to='/'>Home</Link>
          <Link className=" hover:border-b-2 hover:border-secondary" to='/hotel'>Rooms</Link>
          <Link className=" hover:border-b-2 hover:border-secondary" to='/about'>About</Link>
          <Link className=" hover:border-b-2 hover:border-secondary" to='/destination'>Destination</Link>
        </div>

    <div className='flex'>
    {user ?(<><div className="dropdown">
        <button className="btn btn-1 btn-secondary dropdown-toggle p-1 mt-2 bg-transparent border-none text-first text-xl" type="button" data-toggle="dropdown" aria-expanded="false">
        <i className="ri-account-circle-fill "></i> {user.name}
         </button>
        <div className="dropdown-menu text-lg bg-slate-200">
        <a className="dropdown-item " href="#">Bookings</a>
        <a className="dropdown-item cursor-pointer" onClick={logout}>Log out</a>
      </div>
      </div></>)
        :<>
        <div className="flex gap-6 px-2 py-2 font-bold text-xl md:text-base md:gap-2 md:px-1 sm:gap-3 text-first">
          <Link to="/register"  className='hover:border-b-2 hover:border-secondary'><i className="ri-contacts-fill px-2 md:px-1 "></i>Register</Link>
          <Link to="/login" className='hover:border-b-2 hover:border-secondary'><i className="ri-account-circle-fill px-2 md:px-1 "></i>Login</Link>
        </div>
        </>}

       <i className={`ri-menu-line menu p-2 text-2xl ${isVerticalNavVisible ? "active" : ""}`} onClick={handleMenuClick}></i>
      </div>
      <div className={`vertical-nav ${isVerticalNavVisible ? "block" : "hidden"}`}><VerticalNav onClose={handleCloseClick} /></div>
    </div>
    </>
  );
}
export default Header;



