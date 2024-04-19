import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReactionDomainFacade } from '@server/modules/reaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReactionApplicationEvent } from './reaction.application.event'
import { ReactionCreateDto } from './reaction.dto'

import { PostDataDomainFacade } from '../../postData/domain'

@Controller('/v1/postDatas')
export class ReactionByPostDataController {
  constructor(
    private postDataDomainFacade: PostDataDomainFacade,

    private reactionDomainFacade: ReactionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/post/:postId/reactions')
  async findManyPostId(
    @Param('postId') postId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.postDataDomainFacade.findOneByIdOrFail(postId)

    const items = await this.reactionDomainFacade.findManyByPost(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/post/:postId/reactions')
  async createByPostId(
    @Param('postId') postId: string,
    @Body() body: ReactionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, postId }

    const item = await this.reactionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReactionApplicationEvent.ReactionCreated.Payload>(
      ReactionApplicationEvent.ReactionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
