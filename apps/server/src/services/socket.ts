import { Server } from 'socket.io'

import { Redis } from 'ioredis'


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

    }


    public initListeners(){
        const io=this._io
        io.on('connect',async socket=>{
            console.log(`newsocket connected`,socket.id);

            socket.on('event:message',async({message}:{message:String})=>{

                console.log('New mesage recieved',message)
                //publish the message to redis


              })


        
        });
    }


    get io(){
        return this._io
    }








}



export default SocketService;