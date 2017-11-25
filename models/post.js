import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { UserTC } from './user'
import { TagTC } from './tag'
import { CommentTC } from './comment'

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: String,
  tagIds: [String]
}, {
  timestamps: true
})

export const PostModel = mongoose.model('PostModel', PostSchema)

export const PostTC = composeWithMongoose(PostModel)

PostTC.addRelation('user', {
  resolver: () => UserTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.userId,
    skip: null,
    sort: null
  },
  projection: { userId: true }
})

PostTC.addRelation('comments', {
  resolver: () => CommentTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ postId: source._id })
  },
  projection: { _id: true }
})

PostTC.addRelation('tags', {
  resolver: () => TagTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.tagIds,
    // filter: source => ({ tagIds: source._id }),
    skip: null,
    sort: null
  },
  projection: { tagIds: true }
})

