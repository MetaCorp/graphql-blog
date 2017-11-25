import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { PostTC } from './post'
import { UserTC } from './user'

const CommentSchema = new mongoose.Schema({
  body: String,
  postId: String,
  userId: String
}, {
  timestamps: true
})

export const CommentModel = mongoose.model('CommentModel', CommentSchema)

export const CommentTC = composeWithMongoose(CommentModel)

CommentTC.addRelation('post', {
  resolver: () => PostTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.postId,
    skip: null,
    sort: null
  },
  _projection: { postId: true }
})

CommentTC.addRelation('user', {
  resolver: () => UserTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.userId,
    skip: null,
    sort: null
  },
  _projection: { userId: true }
})
