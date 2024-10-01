// src/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../../constants/appConstants.json';

export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles);
