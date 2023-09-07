import db from "../../config/db";
import { UserModel } from "../../user";

import ServiceCentreModel from "./service_centres.model";
import ServiceTypeModel from "./service_type.model";
import { VehicleModel } from "../../vehicle";

const { INTEGER, DATEONLY, TIME, STRING } = db.DataTypes;
const { Sequelize, Model, sequelizeTz } = db;

class ServiceBooking extends Model {}

ServiceBooking.init(
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    service_centre_id: {
      type: INTEGER,
      model: ServiceCentreModel,
      key: "id",
      deferrable: Sequelize.INITIALLY_IMMEDIATE,
    },
    service_type_id: {
      type: INTEGER,
      model: ServiceTypeModel,
      key: "id",
      deferrable: Sequelize.INITIALLY_IMMEDIATE,
    },
    vehicle_id: {
      type: INTEGER,
      model: VehicleModel,
      key: "id",
      deferrable: Sequelize.INITIALLY_IMMEDIATE,
    },
    user_id: {
      type: INTEGER,
      model: UserModel,
      key: "id",
      deferrable: Sequelize.INITIALLY_IMMEDIATE,
    },
    preferred_date: {
      type: DATEONLY,
    },
    preferred_time: {
      type: TIME,
    },
    status: {
      type: STRING,
      defaultValue: "Pending",
    },
  },
  {
    sequelize: sequelizeTz,
    timestamps: true,
    modelName: "service_bookings",
  }
);

ServiceBooking.belongsTo(ServiceCentreModel, {
  foreignKey: "service_centre_id",
  as: "service_centre",
  targetKey: "id",
});

ServiceBooking.belongsTo(VehicleModel, {
  foreignKey: "vehicle_id",
  as: "vehicle",
  targetKey: "id",
});

ServiceBooking.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
  targetKey: "id",
});

ServiceBooking.belongsTo(ServiceTypeModel, {
  foreignKey: "service_type_id",
  as: "service_type",
  targetKey: "id",
});

export default ServiceBooking;
