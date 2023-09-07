import db from "../config/db";
import { RoleModel } from "../roles";

const { INTEGER, STRING, BOOLEAN } = db.DataTypes;
const { Sequelize, Model, sequelizeTz } = db;

class User extends Model {}

User.init(
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING },
    email: {
      type: STRING,
      unique: true,
    },
    password: {
      type: STRING,
    },
    phone: {
      type: STRING,
    },
    is_verified: {
      type: BOOLEAN,
      defaultValue: false,
    },
    role_id: {
      type: INTEGER,
      model: RoleModel,
      key: "id",
      deferrable: Sequelize.INITIALLY_IMMEDIATE,
    },
  },
  {
    sequelize: sequelizeTz,
    timestamps: true,
    modelName: "Users",
  }
);

User.belongsTo(RoleModel, {
  foreignKey: "role_id",
  targetKey: "id",
});

export default User;
