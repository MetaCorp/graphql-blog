import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { PostTC } from './post'

const TagSchema = new mongoose.Schema({
  name: String
})

export const TagModel = mongoose.model('TagModel', TagSchema)

export const TagTC = composeWithMongoose(TagModel)

TagTC.addRelation('posts', {
  resolver: () => PostTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ tagIds: source._id })
  },
  projection: { _id: true }
})

