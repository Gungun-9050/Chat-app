import React from 'react'
import Sidebar from '../component/Sidebar'
import { useChatStore } from '../store/useChatStore'
import { NoChatSelected } from '../component/noChatSelected'
import ChatSelected from '../component/chatSelected'





const HomePage = () => {
  const {selectedUser} =useChatStore()
  
  return (

    
      <div className='flex flex-col justify-center bg-base-200 items-center h-[88vh] p-6 px-56 mt-6 rounded-xl'>
      <div className='flex bg-base-100 h-full w-full rounded-xl'>
        <Sidebar/>
        <div className='w-full'>
        {selectedUser? <ChatSelected className='flex justify-start w-full'/> : 
          <div className='flex justify-center items-center w-full h-full'>
          <NoChatSelected />
        
        </div>
}
      </div>
    </div>
   </div> 
  )
} 

export default HomePage
