import { User } from '../user'

import { Comment } from '../comment'

import { Reaction } from '../reaction'

export class PostData {
  id: string

  title: string

  content: string

  dateCreated: string

  dateUpdated: string

  dateDeleted: string

  userId: string

  user?: User

  comments?: Comment[]

  reactions?: Reaction[]
}
