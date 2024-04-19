import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ReactionCreateDto {
  @IsString()
  @IsNotEmpty()
  type: string

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

export class ReactionUpdateDto {
  @IsString()
  @IsOptional()
  type?: string

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
