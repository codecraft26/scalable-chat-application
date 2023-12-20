'use client'
import React, { use, useCallback, useEffect ,useContext, useState} from 'react'
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/debug';




interface SocketContextProps{
    children?:React.ReactNode

}





interface ISocketContext{
    sendMessage:(msg:string)=>any;
    messages:string[];
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

    const [socket,setSocket]=useState<Socket>();
    const [messages,setMessages]=useState<string[]>([])
  



    const sendMessage:ISocketContext['sendMessage']=useCallback((msg)=>{
            if(!msg){
                throw new Error("message is empty");
            }
        console.log("send message to server",msg)

        if(socket){
            socket.emit("event:message",{message:msg})  
        }
    },[socket])



    const onMessageRec=useCallback((msg)=>{

        console.log("message recieved",msg)

        const {message}=JSON.parse(msg) as {message:string};
        setMessages((prev)=>[...prev,message])


    },[])

    useEffect(()=>{
       const _socket =io("http://localhost:8000");

         _socket.on("message",onMessageRec)
       setSocket(_socket)


       return ()=>{
        _socket.disconnect();
        _socket.off("message",onMessageRec)
        setSocket(undefined)
    }
    }   
    ,[])

    return <SocketContext.Provider value={{sendMessage,messages}}>
        {children}
    </SocketContext.Provider>
}