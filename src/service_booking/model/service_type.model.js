import db from "../../config/db";
import ServiceCentreModel from "./service_centres.model";

const { INTEGER, STRING } = db.DataTypes;
const { Sequelize, Model, sequelizeTz } = db;

class ServiceTypes extends Model {}

ServiceTypes.init(
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING },
    service_centre_id: {
      type: INTEGER,
      model: ServiceCentreModel,
      key: "id",
      deferrable: Sequelize.INITIALLY_IMMEDIATE,
    },
  },
  {
    sequelize: sequelizeTz,
    timestamps: true,
    modelName: "services",
  }
);

ServiceTypes.belongsTo(ServiceCentreModel, {
  foreignKey: "service_centre_id",
  targetKey: "id",
});

export default ServiceTypes;
