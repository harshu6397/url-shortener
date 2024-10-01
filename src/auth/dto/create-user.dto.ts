import { IsNotEmpty, IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the User' })
  @IsNotEmpty({ message: 'Username should not be empty' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email address of the User' })
  @IsEmail({}, { message: 'Enter a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description:
      'The password of the User. Must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.',
  })
  password: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  userLoginType?: string;
}
