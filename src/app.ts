import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { clientsRoutes } from './routes/clientRoute'

export const app = fastify()

app.register(cookie)

app.register(clientsRoutes, {
  prefix: 'clientes',
})