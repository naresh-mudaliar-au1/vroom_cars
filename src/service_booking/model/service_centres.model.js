import db from "../../config/db";
import { UserModel } from "../../user";
// import { ServiceTypes } from "./service_type.model";

const { INTEGER, STRING } = db.DataTypes;
const { Sequelize, Model, sequelizeTz } = db;

class ServiceCentreModel extends Model {}

ServiceCentreModel.init(
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING },
    location: {
      type: STRING,
    },
    working_hours: {
      type: STRING,
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
    modelName: "service_centres",
  }
);

ServiceCentreModel.belongsTo(UserModel, {
  foreignKey: "owner",
  targetKey: "id",
});

// ServiceCentreModel.hasMany(ServiceTypes, {
//   foreignKey: "service_centre_id",
//   targetKey: "id",
// });

export default ServiceCentreModel;
