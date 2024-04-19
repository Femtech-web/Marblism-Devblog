import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CommentCreateDto {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  postId?: string
}

export class CommentUpdateDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  postId?: string
}
