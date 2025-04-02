import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut, MessageSquare, Settings, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';


const Navbar = () => {

const {logout, authUser}= useAuthStore();

  return (
    <div className=" flex justify-between items-center pt-3 px-2">
    <Link to="/" className='flex gap-1' >
    <MessageSquare/>
    Chatty
    </Link>
    
    <div className="flex gap-4  ">
      <Link to="/settings" className='flex gap-1' >
      <Settings/>
      Settings
      </Link>

     {authUser?
     <div className='flex gap-4'>
      <Link to="/profile" className='flex gap-1'>
      <UserRound/>
      Profile
      </Link>

      <button onClick={logout} className='flex gap-1'>
      <LogOut/>
      Logout
      </button>


      </div>
       :""} 
    </div>
    </div>
 
  )
}

export default Navbar
