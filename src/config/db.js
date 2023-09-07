require("dotenv").config({ path: ".env" });
import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.host, //"localhost",
    dialect: "mysql",
    port: 3306,
    logging: false,
    logQueryParameters: false,
  }
);

let connection = {};
connection.sequelizeTz = sequelize;
connection.Sequelize = Sequelize;
connection.Model = Model;
connection.DataTypes = DataTypes;

export default connection;
