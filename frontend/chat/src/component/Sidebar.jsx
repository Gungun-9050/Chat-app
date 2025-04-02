import { Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import profile from '../assets/profile.jpg'

const Sidebar = () => {
  const {users,getUsers,selectedUser,setSelectedUser} = useChatStore()
  
  useEffect(()=>{
    getUsers()
  },[getUsers])
  return (
    <div className='p-4 overflow-y-scroll w-1/3'>
    <div className='flex gap-2 mb-2'>
      <Users/>
     <p className='text-xl font-bold'> Contacts </p>
    </div>
    <div className='flex flex-col'>
    {users.map((user)=>(
      <button className='' key={user._id} onClick={()=>setSelectedUser(user)}>
      
        
      <div className='flex items-center p-2'>
                            
                            < img  src={user.profilePic || profile} className='rounded-full bg-primary w-10 h-10 flex justify-center items-center text-primary-content'/>
                            
                        
                        <div className='flex flex-col items-start px-2 '>
                            <div>{user.name}</div>
                            <div className='text-sm font-light'>Online</div>
                        </div>
                    </div>
      
      </button>
    ))}
    </div>
    </div>
  )
}

export default Sidebar
