import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { PostTC } from './post'
import { CommentTC } from './comment'

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
}, {
  timestamps: true
})

export const UserModel = mongoose.model('UserModel', UserSchema)

export const UserTC = composeWithMongoose(UserModel)

UserTC.addRelation('posts', {
  resolver: () => PostTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ userId: source._id })
  },
  projection: { _id: true }
})

UserTC.addRelation('comments', {
  resolver: () => CommentTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ userId: source._id })
  },
  projection: { _id: true }
})
