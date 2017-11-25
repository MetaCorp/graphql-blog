import express from 'express'
import schema from './schema'
import bodyParser from 'body-parser'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import mongoose from 'mongoose'

const DB_URL = 'mongodb://localhost/nuxt-blog'

mongoose.Promise = global.Promise
mongoose.set('debug', true) // debug mode on

try {
  mongoose.connect(DB_URL, {
    useMongoClient: true
  })
} catch (err) {
  mongoose.createConnection(DB_URL, {
    useMongoClient: true
  })
}

mongoose.connection
  .once('open', () => console.log('MongoDB connection'))
  .on('error', e => {
    throw e
  })

const server = express()
server.use(bodyParser.json())
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
server.use('/graphql', graphqlExpress((req) => ({
  schema
})))

server.listen(8000, function () { console.log('app launch on 8000') })