import db from "../config/db";

const { INTEGER, STRING } = db.DataTypes;
const { Model, sequelizeTz } = db;

class Role extends Model {}

Role.init(
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING },
  },
  {
    sequelize: sequelizeTz,
    timestamps: true,
    modelName: "Roles",
  }
);

export default Role;
