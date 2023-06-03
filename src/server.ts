import { app } from './app'
import { env } from './env'

const port = Number(process.env.PORT) || 3000//|| env.PORT || 3000; 

app
  .listen({ port, host: '0.0.0.0' })
  .then((a) => {
    console.log('HTTP Server Running!')
    console.log('HTTP Server Running!', port)
    console.log('a', a)
  })