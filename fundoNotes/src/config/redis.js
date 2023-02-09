import { createClient } from 'redis';

export const client = createClient()

const redis = async () => {
    try {
        await client.connect();
        console.log('Redis client is Connected.....!!!!');


    } catch (error) {
        console.log('Error in Connecting Redis client...!!!!', error);

    }
}

export default redis;