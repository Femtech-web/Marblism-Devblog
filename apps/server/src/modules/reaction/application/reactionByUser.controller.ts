import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReactionDomainFacade } from '@server/modules/reaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReactionApplicationEvent } from './reaction.application.event'
import { ReactionCreateDto } from './reaction.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ReactionByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private reactionDomainFacade: ReactionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/reactions')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.reactionDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/reactions')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ReactionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
