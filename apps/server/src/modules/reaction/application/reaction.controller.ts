import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Reaction, ReactionDomainFacade } from '@server/modules/reaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ReactionApplicationEvent } from './reaction.application.event'
import { ReactionCreateDto, ReactionUpdateDto } from './reaction.dto'

@Controller('/v1/reactions')
export class ReactionController {
  constructor(
    private eventService: EventService,
    private reactionDomainFacade: ReactionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.reactionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ReactionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.reactionDomainFacade.create(body)

    await this.eventService.emit<ReactionApplicationEvent.ReactionCreated.Payload>(
      ReactionApplicationEvent.ReactionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:reactionId')
  async findOne(
    @Param('reactionId') reactionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.reactionDomainFacade.findOneByIdOrFail(
      reactionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:reactionId')
  async update(
    @Param('reactionId') reactionId: string,
    @Body() body: ReactionUpdateDto,
  ) {
    const item = await this.reactionDomainFacade.findOneByIdOrFail(reactionId)

    const itemUpdated = await this.reactionDomainFacade.update(
      item,
      body as Partial<Reaction>,
    )
    return itemUpdated
  }

  @Delete('/:reactionId')
  async delete(@Param('reactionId') reactionId: string) {
    const item = await this.reactionDomainFacade.findOneByIdOrFail(reactionId)

    await this.reactionDomainFacade.delete(item)

    return item
  }
}
