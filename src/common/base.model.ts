import { Table, Model, DataType, Default, Column } from 'sequelize-typescript';

@Table
export class BaseModel<T> extends Model<T> {
  @Default(() => Date.now())
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'created_at',
  })
  createdAt: bigint;

  @Default(() => Date.now())
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'updated_at',
  })
  updatedAt: bigint;

  @Column({
    defaultValue: true,
    allowNull: false,
    field: 'is_active',
  })
  isActive: boolean;

  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    field: 'unique_id',
  })
  uniqueId: string;

  @Column({
    allowNull: true,
    field: 'comment',
  })
  comment: string;
}
