import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'example.com',
    description: 'Updated custom domain for the User',
    required: false,
  })
  @IsOptional()
  @IsString()
  customDomain?: string;

  @ApiProperty({
    example: 'http://example.com/avatar.jpg',
    description: 'Updated avatar URL for the User',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    example: 'updatePreferences',
    description: 'Updated next action for the User',
    required: false,
  })
  @IsOptional()
  @IsString()
  nextAction?: string;
}
