import {Kafka, Producer} from "kafkajs"
import fs from 'fs'
import path from "path"
import prismaClient from "./prisma"
const kafka = new Kafka({

  brokers: ["kafka-3109a66d-gaman0221-c04c.a.aivencloud.com:20137"],
  ssl:{
    ca:[fs.readFileSync(path.resolve("./src/services/ca.pem"), "utf-8")],
  },
  sasl:{
    username:'avnadmin',
    password:'AVNS_zhnjhuJq8H_Wjl3hhpY',
    mechanism:'plain'
  },

})

let producer:null | Producer=null
export async function createProducer() {


    if(producer){
        return producer

    }
    const _producer = kafka.producer()
    await _producer.connect()


    producer=_producer

    return producer;

}


export async function ProduceMessage(message: string) {

    const producer = await createProducer()
    await producer.send({

        messages: [{ key: `message-${Date.now()}`, value: message }],
        topic: 'MESSAGES',
    })


    return true;
}

export async function startMessageConsumer(){
    console.log('startMessageConsumer');
    const consumer = kafka.consumer({ groupId: "default" });
    await consumer.connect();
    await consumer.subscribe({ topic: "MESSAGES",fromBeginning:true });
    await consumer.run({
        autoCommit:true,
        eachMessage: async ({message,pause})=>{

            try{
                if(!message.value){ return }

            console.log(`New message recieved `)
            await prismaClient.message.create({
                data:{text:message.value?.toString()}
                ,
            })
            }
          
            catch(e){
                console.log(e)
                pause()
                setTimeout(()=>{consumer.resume([{topic:"MESSAGES"}])},60*1000)

            }
        }

    })




}



export default kafka;