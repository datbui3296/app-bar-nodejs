import Queue from 'bull'
import { env } from '../config/environtment'


// Sử dụng thư viện bull Khởi tạo một hàng đợi - queue
// với quequeName do chúng ta tự định nghĩa
// Và công việc sẽ được đẩy lên Redis cloud để xử lý
const generateQueue = (queueName) => {
    console.log('vào')
    try {
        return new Queue(queueName, {
            redis: {
                host: env.REDIS_HOST,
                port: env.REDIS_PORT,
                username: env.REDIS_USERNAME,
                password: env.REDIS_PASSWORD
            }
        })
    } catch (error) {
        console.log('1')
        throw new Error(error)
    }
}

export const RedisQueueProvider = {
    generateQueue
}