import db from "../config/db";
import { UserModel } from "../user";

const { INTEGER, STRING, DATEONLY } = db.DataTypes;
const { Sequelize, Model, sequelizeTz } = db;

class Vehicle extends Model {}

Vehicle.init(
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING },
    type: {
      type: STRING,
    },
    make: {
      type: STRING,
    },
    model: {
      type: STRING,
    },
    engine_number: {
      type: STRING,
    },
    previous_service_date: {
      type: DATEONLY,
    },
    next_service_date: {
      type: DATEONLY,
    },
    owner: {
      type: INTEGER,
      model: UserModel,
      key: "id",
      deferrable: Sequelize.INITIALLY_IMMEDIATE,
    },
  },
  {
    sequelize: sequelizeTz,
    timestamps: true,
    modelName: "Vehicles",
  }
);

Vehicle.belongsTo(UserModel, {
  foreignKey: "owner",
  targetKey: "id",
});

export default Vehicle;
