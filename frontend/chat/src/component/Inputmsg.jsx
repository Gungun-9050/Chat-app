import { Image, Send, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useChatStore } from '../store/useChatStore';

const Inputmsg = () => {
  
  
    const[text, setText] = useState("");
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null)
    const {sendMessage} = useChatStore();

    const handleImageChange= (e)=> {
        const file = e.target.files[0]
        if(!file.type.startsWith('image/')){
            toast.error('Please select an image')
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
    }

        const removeImage = () => {
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value = "";
          }

        const handleSendMessages = async(e) => {
            e.preventDefault();
            if (!text.trim() && !imagePreview) return;

            try {
                await sendMessage({
                  text: text.trim(),
                  image: imagePreview,
                });
                setText("");
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              } catch (error) {
                console.error("Failed to send message:", error);
              }

        }

  return (

    
      <div className=' flex justify-evenly gap-2 p-2 items-center '>
        <form  className='flex items-center w-full gap-4'>
        <input type='text' onChange={(e)=>setText(e.target.value)} onSubmit={handleSendMessages} value={text} placeholder='Type a message' className='w-full border-base-300 border-2 rounded-full  p-2 bg-transparent' />
        <label htmlFor="image-upload">
            <input type="file"
            id='image-upload'
            className='hidden'
            accept="image/*"
            onChange={handleImageChange}
            />
            <Image onClick={() => fileInputRef.current?.click()}/>
            </label>
        </form>
         <button  type=' submit' onClick={handleSendMessages}><Send/></button> 
        
      </div>

  )
}

export default Inputmsg
