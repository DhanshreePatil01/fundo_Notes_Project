import { sendMailToRegisteredUser } from '../utils/app';
var amqp = require('amqplib/callback_api');

export const producer=(queue,msg)=>{
    amqp.connect(`amqp://localhost`, function(err, connection) {
    if (err)
    {
        throw err;
    }
    connection.createChannel(function(error, channel) {
        if (error) {
            throw error;
        }

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" msg Sent :", msg);
    });
    setTimeout(function() {
        connection.close();
    }, 10000);
});
}


export const consumer=(queue)=>{
    amqp.connect(`amqp://localhost`, function(err, connection) {
    if (err) 
    {
        throw err;
    }
    connection.createChannel(function(error, channel) {
        if (error)
        {
            throw error;
        }

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(queue);

        channel.consume(queue,async function(msg){
            const object=msg.content.toString();

            const data=JSON.parse(object);
            const Email = data.email;
            const Firstname = data.firstname;
            const Lastname = data.lastname;

            const result=await sendMailToRegisteredUser(Email, Firstname, Lastname);

            console.log("result-----------------------",result);
        },
        {
            noAck: true
        });
    });
});
}
consumer('RegistrationData');