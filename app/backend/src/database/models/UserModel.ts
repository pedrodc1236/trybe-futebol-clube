import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING(100),
  },
  role: {
    allowNull: false,
    type: STRING(100),
  },
  email: {
    allowNull: false,
    type: STRING(100),
  },
  password: {
    allowNull: false,
    type: STRING(100),
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false });

export default User;
