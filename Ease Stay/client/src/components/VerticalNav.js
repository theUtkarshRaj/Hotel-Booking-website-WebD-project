import React from "react";
import {Link} from "react-router-dom";

function VerticalNav({ onClose }) {
  function logout(){
    localStorage.removeItem('currentUser');
    window.location.href='/login'
  };
  return (
    <div className='vertical-nav bg-slate-800 w-52 h-full absolute top-0 right-0 z-50 opacity-96'>
      <i className="ri-close-circle-fill position text-white absolute top-1 right-1 text-3xl hover:text-secondary" onClick={onClose}></i>
      <div className='text-white text-xl absolute top-8 left-3 space-y-3 flex flex-col'>
        <Link className=" hover:text-secondary" to="/">Home</Link>
        <Link className=" hover:text-secondary" to="">About</Link>
        <Link className=" hover:text-secondary" to="/hotel">Hotels</Link>
        <Link className=" hover:text-secondary" to="">Destination</Link>

        <Link className='hover:text-secondary' to="">Support</Link>
        <Link className='hover:text-secondary' onClick={logout}>Log out</Link>
      </div>
    </div>
  );
}
export default VerticalNav;
