'use client'
import React, { use, useCallback, useEffect ,useContext, useState} from 'react'
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/debug';




interface SocketContextProps{
    children?:React.ReactNode

}





interface ISocketContext{
    sendMessage:(msg:string)=>any
}
const SocketContext = React.createContext<ISocketContext|null>(null);

export const useSocket=()=>{

    const state =useContext(SocketContext)
    if(!state){
        throw new Error("useSocket must be used within SocketProvider")
    }
    return state;
}




export const SocketProvider:React.FC<SocketContextProps>=({children})=>{

    const [socket,setSocket]=useState<Socket>()
  



    const sendMessage:ISocketContext['sendMessage']=useCallback((msg)=>{

        console.log("send message to server",msg)

        if(socket){
            socket.emit("event:message",{message:msg})  
        }
    },[socket])


    useEffect(()=>{
       const _socket =io("http://localhost:8000");
       setSocket(_socket)


       return ()=>{
        _socket.disconnect();
        setSocket(undefined)
    }
    }   
    ,[])

    return <SocketContext.Provider value={{sendMessage}}>
        {children}
    </SocketContext.Provider>
}