import { User } from '../user'

import { PostData } from '../postData'

export class Reaction {
  id: string

  type: string

  dateCreated: string

  dateUpdated: string

  dateDeleted: string

  userId: string

  user?: User

  postId: string

  post?: PostData
}
