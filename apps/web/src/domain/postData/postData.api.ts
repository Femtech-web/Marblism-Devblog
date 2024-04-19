import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { PostData } from './postData.model'

export class PostDataApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<PostData>,
  ): Promise<PostData[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/postDatas${buildOptions}`)
  }

  static findOne(
    postDataId: string,
    queryOptions?: ApiHelper.QueryOptions<PostData>,
  ): Promise<PostData> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/postDatas/${postDataId}${buildOptions}`)
  }

  static createOne(values: Partial<PostData>): Promise<PostData> {
    return HttpService.api.post(`/v1/postDatas`, values)
  }

  static updateOne(
    postDataId: string,
    values: Partial<PostData>,
  ): Promise<PostData> {
    return HttpService.api.patch(`/v1/postDatas/${postDataId}`, values)
  }

  static deleteOne(postDataId: string): Promise<void> {
    return HttpService.api.delete(`/v1/postDatas/${postDataId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<PostData>,
  ): Promise<PostData[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/postDatas${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<PostData>,
  ): Promise<PostData> {
    return HttpService.api.post(`/v1/users/user/${userId}/postDatas`, values)
  }
}
