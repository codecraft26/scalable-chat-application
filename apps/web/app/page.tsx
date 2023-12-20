
'use client'
import React, { useState } from 'react'
import classes from './page.module.css'
import { useSocket } from '../context/SocketProvider'
const page = () => {


  const {sendMessage,messages}=useSocket()
  const [message,setMessage]=useState('')
  const [error, setError] = useState('');


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (message.trim() === '') {
        setError('Message cannot be empty');
      } else {
        setError('');
        sendMessage(message);
        setMessage('');
      }
    }
  };
  return (
    <div className={classes["conatiner"]}> 

    <div className={classes["chat-container"]}>
      {
        messages.map((msg,i)=>{
          return <div key={i}>{msg}</div>
        })
      } 
      </div>



      <div className={classes['message-input']}>
    <input type="text"
     className={classes['user-message']} 
     onKeyPress={handleKeyPress} 
     placeholder='Message....' 
     value={message} 
    onChange={e=>setMessage(e.target.value)}/>

    <button onClick={(e)=>sendMessage(message)}
     className={classes['button']}>
      Send
      </button>
  {error && <div className={classes['error-message']}>{error}</div>}
      </div>
      </div>    
   
  )
}

export default page