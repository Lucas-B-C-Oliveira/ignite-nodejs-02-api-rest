import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'


export async function clientsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    async (request) => {
      
      
      try {
        const clients = await knex('clientes')
          .select()

        return { clients }
        
      } catch (error) {

        console.log('erro', error)
        return { error }
        
      }


    },
  )

  app.delete('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      _id: z.string(),
    })

    const { _id } = createTransactionBodySchema.parse(
      request.body,
    )

    try {
      await knex('clientes')
        .where('_id', _id).delete()

      return reply.status(200).send()
    }
    catch (error) {
      console.log('erro', error)
      return { error }
    }


  })

  app.put('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      _id: z.string(),
      nome: z.string().nullish(),
      sobreNome: z.string().nullish(),
    })

    const { nome, sobreNome, _id } = createTransactionBodySchema.parse(
      request.body,
    )

    try {
      
 

      if (nome) {
        await knex('clientes')
          .where('_id', _id)
          .update({
            nome,
          })
      }

      if (sobreNome) {
        await knex('clientes')
          .where('_id', _id)
          .update({
            sobreNome
          })
      }

      const client = await knex('clientes')
        .where('_id', _id)
        .first()

      return reply.status(200).send({ client })
      
    }
    catch (error) {
      console.log('erro', error)
      return { error }
    }
  })

  app.post('/', async (request, reply) => {
    try {
      const createTransactionBodySchema = z.object({
        nome: z.string(),
        sobreNome: z.string(),
      })

      const { nome, sobreNome } = createTransactionBodySchema.parse(
        request.body,
      )


      await knex('clientes').insert({
        _id: randomUUID(),
        nome,
        sobreNome,
      })

      return reply.status(200).send()

    } catch (error) {
      console.log('erro', error)
      return { error }
    }
  })
}