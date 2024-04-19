import { User } from '../user'

import { PostData } from '../postData'

export class Comment {
  id: string

  content: string

  dateCreated: string

  dateUpdated: string

  dateDeleted: string

  userId: string

  user?: User

  postId: string

  post?: PostData
}
