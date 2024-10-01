import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../common/base.model';
import { ROLES, USER_LOGIN_TYPE } from '../constants/appConstants.json';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends BaseModel<User> {
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'username',
  })
  username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'email',
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'password',
  })
  password: string;

  @Column({
    type: 'enum',
    values: Object.values(ROLES),
    defaultValue: ROLES.USER,
    field: 'role',
  })
  role: string;

  @Column({
    type: 'enum',
    values: Object.values(USER_LOGIN_TYPE),
    defaultValue: USER_LOGIN_TYPE.EMAIL_PASSWORD,
    field: 'user_login_type',
  })
  userLoginType: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'custom_domain',
  })
  customDomain: string;

  @Column({
    type: DataType.TEXT('medium'),
    allowNull: true,
    field: 'avatar_url',
  })
  avatarUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'next_action',
  })
  nextAction: string;
}
