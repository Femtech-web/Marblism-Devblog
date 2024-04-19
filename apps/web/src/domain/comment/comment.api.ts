import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Comment } from './comment.model'

export class CommentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Comment>,
  ): Promise<Comment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/comments${buildOptions}`)
  }

  static findOne(
    commentId: string,
    queryOptions?: ApiHelper.QueryOptions<Comment>,
  ): Promise<Comment> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/comments/${commentId}${buildOptions}`)
  }

  static createOne(values: Partial<Comment>): Promise<Comment> {
    return HttpService.api.post(`/v1/comments`, values)
  }

  static updateOne(
    commentId: string,
    values: Partial<Comment>,
  ): Promise<Comment> {
    return HttpService.api.patch(`/v1/comments/${commentId}`, values)
  }

  static deleteOne(commentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/comments/${commentId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Comment>,
  ): Promise<Comment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/comments${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Comment>,
  ): Promise<Comment> {
    return HttpService.api.post(`/v1/users/user/${userId}/comments`, values)
  }

  static findManyByPostId(
    postId: string,
    queryOptions?: ApiHelper.QueryOptions<Comment>,
  ): Promise<Comment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/postDatas/post/${postId}/comments${buildOptions}`,
    )
  }

  static createOneByPostId(
    postId: string,
    values: Partial<Comment>,
  ): Promise<Comment> {
    return HttpService.api.post(`/v1/postDatas/post/${postId}/comments`, values)
  }
}
