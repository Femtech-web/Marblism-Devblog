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

import { Notification } from '../../../modules/notification/domain'

import { PostData } from '../../../modules/postData/domain'

import { Comment } from '../../../modules/comment/domain'

import { Reaction } from '../../../modules/reaction/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => PostData, child => child.user)
  posts?: PostData[]

  @OneToMany(() => Comment, child => child.user)
  comments?: Comment[]

  @OneToMany(() => Reaction, child => child.user)
  reactions?: Reaction[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
