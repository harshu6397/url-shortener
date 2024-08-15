import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  async findUser(
    conditions: Partial<User>,
    selectedFields: Array<string> = ['*'],
  ): Promise<Partial<User>> {
    try {
      const user = await this.userModel.findOne({
        where: { ...conditions },
        attributes: selectedFields,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      return await this.userModel.update(updateUserDto, {
        where: { uniqueId: userId },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
