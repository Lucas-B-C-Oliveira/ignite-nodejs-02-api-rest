import { app } from './app'
import { env } from './env'

const port = process.env.PORT || env.PORT || 3000; 

app
  .listen({
    port,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })