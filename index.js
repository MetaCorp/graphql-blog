import express from 'express'
import cors from 'cors'
import schema from './schema'
import bodyParser from 'body-parser'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import mongoose from 'mongoose'

import { mergeSchemas, makeExecutableSchema } from 'graphql-tools'

import { AccountsServer } from '@accounts/server'
import { AccountsPassword } from '@accounts/password'
import MongoDBInterface from '@accounts/mongo'
import { createJSAccountsGraphQL, JSAccountsContext } from '@accounts/graphql-api'

const DB_URL = 'mongodb://localhost/nuxt-blog'

mongoose.Promise = global.Promise
mongoose.set('debug', true)

try {
  mongoose.connect(DB_URL, {
    useMongoClient: true
  })
} catch (err) {
  mongoose.createConnection(DB_URL, {
    useMongoClient: true
  })
}

const db = mongoose.connection

const accountsServer = new AccountsServer({
  db: new MongoDBInterface(db),
  tokenSecret: 'secret',
}, {
  password: new AccountsPassword()
})

const accountsGraphQL = createJSAccountsGraphQL(accountsServer)

const resolversWithAccounts = accountsGraphQL.extendWithResolvers({})

const extraSchema = makeExecutableSchema({
  resolvers: resolversWithAccounts,
  typeDefs: [
    `
    type Query {
      myQuery: String
    }

    type Mutation {
      myMutation: String
    }

    schema {
      query: Query,
      mutation: Mutation
    }
    `,
    accountsGraphQL.schema
  ]
})

const mergedSchema = mergeSchemas({
  schemas: [extraSchema, schema]
})

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.use('/graphql', graphqlExpress((req) => ({
  schema: mergedSchema,
  context: JSAccountsContext(req)
})))

app.listen(8000, function () { console.log('app launch on 8000') })
