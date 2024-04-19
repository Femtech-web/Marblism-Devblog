import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CommentDomainModule } from '../domain'
import { CommentController } from './comment.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CommentByUserController } from './commentByUser.controller'

import { PostDataDomainModule } from '../../../modules/postData/domain'

import { CommentByPostDataController } from './commentByPostData.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CommentDomainModule,

    UserDomainModule,

    PostDataDomainModule,
  ],
  controllers: [
    CommentController,

    CommentByUserController,

    CommentByPostDataController,
  ],
  providers: [],
})
export class CommentApplicationModule {}
