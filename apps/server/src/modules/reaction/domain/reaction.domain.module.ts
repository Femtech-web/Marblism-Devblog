import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ReactionDomainFacade } from './reaction.domain.facade'
import { Reaction } from './reaction.model'

@Module({
  imports: [TypeOrmModule.forFeature([Reaction]), DatabaseHelperModule],
  providers: [ReactionDomainFacade, ReactionDomainFacade],
  exports: [ReactionDomainFacade],
})
export class ReactionDomainModule {}
