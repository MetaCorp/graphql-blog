import express from 'express'
import cors from 'cors'
import GQC from './schema'
import bodyParser from 'body-parser'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import mongoose from 'mongoose'

import { AccountsServer } from '@accounts/server'
import { AccountsPassword } from '@accounts/password'
import MongoDBInterface from '@accounts/mongo'
import { createJSAccountsGraphQL, JSAccountsContext } from '@accounts/graphql-api'

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

const db = mongoose.connection

const accountsServer = new AccountsServer({
  db: new MongoDBInterface(db),
  tokenSecret: 'secret',
}, {
  password: new AccountsPassword()
})

const accountsGraphQL = createJSAccountsGraphQL(accountsServer)

// console.log('accountsGraphQL :', JSON.stringify(accountsGraphQL))
const accountsSchema = accountsGraphQL.extendWithResolvers(GQC.types)
const schema = GQC.buildSchema()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: JSAccountsContext(req)
})))

app.listen(8000, function () { console.log('app launch on 8000') })