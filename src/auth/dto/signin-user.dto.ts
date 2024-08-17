import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({ example: 'john@example.com', description: 'Email of the User' })
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description:
      'Password of the User. Must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.',
  })
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Invalid password format. It must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.',
  })
  password: string;
}
