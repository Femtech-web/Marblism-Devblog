import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReactionDomainModule } from '../domain'
import { ReactionController } from './reaction.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ReactionByUserController } from './reactionByUser.controller'

import { PostDataDomainModule } from '../../../modules/postData/domain'

import { ReactionByPostDataController } from './reactionByPostData.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReactionDomainModule,

    UserDomainModule,

    PostDataDomainModule,
  ],
  controllers: [
    ReactionController,

    ReactionByUserController,

    ReactionByPostDataController,
  ],
  providers: [],
})
export class ReactionApplicationModule {}
