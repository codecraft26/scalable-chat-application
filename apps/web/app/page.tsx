
'use client'

import React, { useState } from 'react'
import classes from './page.module.css'
import { useSocket } from '../context/SocketProvider'
const page = () => {


  const {sendMessage,messages}=useSocket()
  const [message,setMessage]=useState('')
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
    <input type="text" className={['user-message']} placeholder='Message....' className={classes["chat-input"]}  onChange={e=>setMessage(e.target.value)}/>

    <button onClick={(e)=>sendMessage(message)} className={classes['button']}>Send</button>

      </div>
      </div>    
   
  )
}

export default page