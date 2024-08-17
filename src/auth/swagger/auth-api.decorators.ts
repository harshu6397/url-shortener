import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { SignInUserDto } from 'src/auth/dto/signin-user.dto';

export function RegisterUserDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiBody({ type: CreateUserDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User registered successfully.',
      schema: {
        example: {
          message: 'User registered successfully',
          data: {
            id: 1,
            username: 'testuser',
            email: 'testuser@example.com',
            customDomain: null,
            avatarUrl: null,
            nextAction: null,
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'User with this email already exists',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad Request',
    }),
  );
}

export function LoginUserDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Log in a user' }),
    ApiBody({ type: SignInUserDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User logged in successfully.',
      schema: {
        example: {
          message: 'User logged in successfully',
          data: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwic3ViIjoyLCJpYXQiOjE2MjMxMzQxOTIsImV4cCI6MTYyMzIxNjE5Mn0.eiuekIHU6gFqfJF_byTs1WxZQjWt8BSwXrpB8L3cCYs',
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad Request',
    }),
  );
}

export function GoogleLoginDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Initiate Google OAuth login' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Redirection to Google OAuth.',
    }),
  );
}

export function GoogleLoginCallbackDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Handle Google OAuth callback' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Redirection to the frontend with JWT token',
      schema: {
        example: {
          redirect: 'http://localhost:3000?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
    }),
  );
}
