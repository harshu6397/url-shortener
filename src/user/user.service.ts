import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private logger: LoggerService,
  ) {}

  async createUser(createUserDto: CreateUserDto, role: string): Promise<User> {
    try {
      return await this.userModel.create({
        ...createUserDto,
        role,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async findUser(
    conditions: Partial<User | any>,
    selectedFields: Array<string> = ['*'],
  ): Promise<Partial<User>> {
    try {
      const user = await this.userModel.findOne({
        where: { ...conditions },
        attributes: selectedFields,
      });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      return await this.userModel.update(updateUserDto, {
        where: { uniqueId: userId },
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
