import { GQC } from 'graphql-compose'
import fetch from 'node-fetch'

import { PostTC } from './models/post'
import { TagTC } from './models/tag'
import { UserTC } from './models/user'
import { CommentTC } from './models/comment'


GQC.rootQuery().addFields({
  gqlCompose: {
    type: 'String',
    resolve: () => 'Hi from gqlCompose'
  },
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'), // .debug(), // debug info to console for this resolver
  userTotal: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
  postById: PostTC.getResolver('findById'),
  postByIds: PostTC.getResolver('findByIds'),
  postOne: PostTC.getResolver('findOne'),
  postMany: PostTC.getResolver('findMany'), // .debug(), // debug info to console for this resolver
  postTotal: PostTC.getResolver('count'),
  postConnection: PostTC.getResolver('connection'),
  postPagination: PostTC.getResolver('pagination'),
  commentById: CommentTC.getResolver('findById'),
  commentByIds: CommentTC.getResolver('findByIds'),
  commentOne: CommentTC.getResolver('findOne'),
  commentMany: CommentTC.getResolver('findMany'), // .debug(), // debug info to console for this resolver
  commentTotal: CommentTC.getResolver('count'),
  commentConnection: CommentTC.getResolver('connection'),
  commentPagination: CommentTC.getResolver('pagination'),
  tagMany: TagTC.getResolver('findMany') // .debug(), // debug info to console for this resolver
})

GQC.rootMutation().addFields({
  userCreate: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
  postCreate: PostTC.getResolver('createOne'),
  postUpdateById: PostTC.getResolver('updateById'),
  postUpdateOne: PostTC.getResolver('updateOne'),
  postUpdateMany: PostTC.getResolver('updateMany'),
  postRemoveById: PostTC.getResolver('removeById'),
  postRemoveOne: PostTC.getResolver('removeOne'),
  postRemoveMany: PostTC.getResolver('removeMany'),
  tagCreate: TagTC.getResolver('createOne'),
  tagUpdateById: TagTC.getResolver('updateById'),
  tagUpdateOne: TagTC.getResolver('updateOne'),
  tagUpdateMany: TagTC.getResolver('updateMany'),
  tagRemoveById: TagTC.getResolver('removeById'),
  tagRemoveOne: TagTC.getResolver('removeOne'),
  tagRemoveMany: TagTC.getResolver('removeMany'),
  commentCreate: CommentTC.getResolver('createOne'),
  commentUpdateById: CommentTC.getResolver('updateById'),
  commentUpdateOne: CommentTC.getResolver('updateOne'),
  commentUpdateMany: CommentTC.getResolver('updateMany'),
  commentRemoveById: CommentTC.getResolver('removeById'),
  commentRemoveOne: CommentTC.getResolver('removeOne'),
  commentRemoveMany: CommentTC.getResolver('removeMany')
});

module.exports = GQC.buildSchema()