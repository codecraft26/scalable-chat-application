import { Server } from 'socket.io'

import { Redis } from 'ioredis'
import prismaClient from './prisma'


const pub=new Redis({
    host:'redis-286982a7-gaman0221-c04c.a.aivencloud.com',
    port:20124,
    password:'AVNS_JoLUVnU10Ojj885yy-b',
    username:'default',
}



)
const sub=new Redis({
    host:'redis-286982a7-gaman0221-c04c.a.aivencloud.com',
    port:20124,
    password:'AVNS_JoLUVnU10Ojj885yy-b',
    username:'default',
}



)





class SocketService{
        private _io:Server

    constructor(){

        console.log('SocketService constructor')

        this._io=new Server({
            cors:{
               allowedHeaders: ['*'],
               origin: '*',

            }
        })
         sub.subscribe('MESSAGES',)

    }


    public initListeners(){
        const io=this._io
        io.on('connect',async socket=>{
            console.log(`newsocket connected`,socket.id);


         

            socket.on('event:message',async({message}:{message:String})=>{

                console.log('New mesage recieved',message)
                //publish the message to redis

                await pub.publish('MESSAGES',JSON.stringify({message}))


              })
           

        
        });

        sub.on('message',async (channel,message)=>{

            if(channel==='MESSAGES'){

            
            console.log('New message from redis',message)
            io.emit('message',message)

           await prismaClient.message.create({
               data:{
                text:message,
               }
            })


            }
        }
        )
    }


    get io(){
        return this._io
    }








}



export default SocketService;