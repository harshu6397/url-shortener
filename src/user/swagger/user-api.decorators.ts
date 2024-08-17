import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiSecurity } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

export function GetUserProfileDoc() {
  return applyDecorators(
    ApiSecurity('token'),
    ApiOperation({ summary: 'Get the current user profile.' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User profile retrieved successfully.',
      schema: {
        example: {
          message: 'User profile retrieved successfully',
          data: {
            uniqueId: '2f1a093b-5c91-422a-8cd3-a08cc932a02b',
            username: 'johndoe',
            email: 'johndoe@example.com',
            avatarUrl: null,
          },
        },
      },
    }),
    ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal Server Error.',
    }),
  );
}

export function UpdateUserProfileDoc() {
  return applyDecorators(
    ApiSecurity('token'),
    ApiOperation({ summary: 'Update the current user profile.' }),
    ApiBody({ type: UpdateUserDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User profile updated successfully.',
      schema: {
        example: {
          message: 'User profile updated successfully',
        },
      },
    }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' }),
    ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal Server Error.',
    }),
  );
}
