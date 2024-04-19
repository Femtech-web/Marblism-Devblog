import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Reaction } from './reaction.model'

export class ReactionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Reaction>,
  ): Promise<Reaction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/reactions${buildOptions}`)
  }

  static findOne(
    reactionId: string,
    queryOptions?: ApiHelper.QueryOptions<Reaction>,
  ): Promise<Reaction> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/reactions/${reactionId}${buildOptions}`)
  }

  static createOne(values: Partial<Reaction>): Promise<Reaction> {
    return HttpService.api.post(`/v1/reactions`, values)
  }

  static updateOne(
    reactionId: string,
    values: Partial<Reaction>,
  ): Promise<Reaction> {
    return HttpService.api.patch(`/v1/reactions/${reactionId}`, values)
  }

  static deleteOne(reactionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/reactions/${reactionId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Reaction>,
  ): Promise<Reaction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/reactions${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Reaction>,
  ): Promise<Reaction> {
    return HttpService.api.post(`/v1/users/user/${userId}/reactions`, values)
  }

  static findManyByPostId(
    postId: string,
    queryOptions?: ApiHelper.QueryOptions<Reaction>,
  ): Promise<Reaction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/postDatas/post/${postId}/reactions${buildOptions}`,
    )
  }

  static createOneByPostId(
    postId: string,
    values: Partial<Reaction>,
  ): Promise<Reaction> {
    return HttpService.api.post(
      `/v1/postDatas/post/${postId}/reactions`,
      values,
    )
  }
}
