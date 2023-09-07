import express from "express";
import { json } from "body-parser";
require("dotenv").config({ path: ".env" });
import cors from "cors";
import { UserRoutes } from "./user";
import { VehicleRoutes } from "./vehicle";
import { ServiceBookingRoute } from "./service_booking";
// import Routes from "./routes";
const server = express();

import sequelize from "./config/db";

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

server.use(json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
server.use(cors());

server.use(UserRoutes);
server.use(VehicleRoutes);
server.use(ServiceBookingRoute);

sequelize.sequelizeTz
  .authenticate()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server Running at http://${HOST}:${PORT}/`);
    });
  })
  .catch((e) => console.log("e:error connecting DB", e.message));
