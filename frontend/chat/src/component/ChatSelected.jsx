import React from 'react'
import Chatbox from './Chatbox'
import Chatheader from './Chatheader'
import Inputmsg from './Inputmsg'

const ChatSelected = () => {
  return (
    <div className=' flex flex-col justify-between h-full'>
    <Chatheader/>
    <Chatbox/>
    <Inputmsg/>      
    </div>
  )
}

export default ChatSelected
