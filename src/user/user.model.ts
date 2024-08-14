import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../common/base.model';

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
