import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PostDataDomainModule } from '../domain'
import { PostDataController } from './postData.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { PostDataByUserController } from './postDataByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, PostDataDomainModule, UserDomainModule],
  controllers: [PostDataController, PostDataByUserController],
  providers: [],
})
export class PostDataApplicationModule {}
