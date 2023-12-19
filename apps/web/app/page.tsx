
'use client'

import React, { useState } from 'react'
import classes from './page.module.css'
import { useSocket } from '../context/SocketProvider'
const page = () => {


  const {sendMessage}=useSocket()
  const [message,setMessage]=useState('')
  return (
    <div>
      <div>
        All mee here

      </div>

      <div>
    <input type="text" placeholder='Message....' className={classes["chat-input"]}  onChange={e=>setMessage(e.target.value)}/>

    <button onClick={(e)=>sendMessage(message)} className={classes['button']}>Send</button>

      </div>
    </div>
  )
}

export default page