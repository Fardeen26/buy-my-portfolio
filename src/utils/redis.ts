import { createClient } from 'redis';

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.PORT)
    }
});

client.on('error', (err) => console.error('Redis Client Error', err))

export const redis = client.connect().then(() => client)

