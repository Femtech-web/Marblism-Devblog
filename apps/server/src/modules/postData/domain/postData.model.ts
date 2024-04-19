import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Comment } from '../../../modules/comment/domain'

import { Reaction } from '../../../modules/reaction/domain'

@Entity()
export class PostData {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  title: string

  @Column({})
  content: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.posts)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Comment, child => child.post)
  comments?: Comment[]

  @OneToMany(() => Reaction, child => child.post)
  reactions?: Reaction[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
