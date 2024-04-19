import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { PostDataApplicationModule } from './postData/application'

import { CommentApplicationModule } from './comment/application'

import { ReactionApplicationModule } from './reaction/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    PostDataApplicationModule,

    CommentApplicationModule,

    ReactionApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
