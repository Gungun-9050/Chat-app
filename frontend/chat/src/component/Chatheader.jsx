import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { X } from 'lucide-react'
import profile from '../assets/profile.jpg'

const Chatheader = () => {
    const {selectedUser,setSelectedUser} =useChatStore()
  return (
    <div className='flex justify-between m-2 items-center mr-4'>
        
              <div className='flex items-center p-2 '>
                                    
                                < img  src={selectedUser.profilePic || profile} className='rounded-full bg-primary w-10 h-10 flex justify-center items-center text-primary-content'/>
                                    
                                
                                <div className='flex flex-col items-start px-2 '>
                                    <div>{selectedUser.name}</div>
                                    <div className='text-sm font-light'>Online</div>

                                </div>

                            </div>
                            <X  onClick={()=>setSelectedUser(null)}/>
    </div>
  )
}

export default Chatheader
