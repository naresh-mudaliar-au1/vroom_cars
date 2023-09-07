import { Router } from "express";
import vehicleController from "./vehicle.controller";
import auth from "../middleware/auth";

const { addVehicle, updateVehicle, getVechileByUser, getVehicleById } =
  vehicleController;

export default Router()
  .post("/api/v1/vehicle/add", auth, addVehicle)
  .post("/api/v1/vehicle/update", auth, updateVehicle)
  .get("/api/v1/vehicle/", auth, getVechileByUser)
  .get("/api/v1/vehicle/:id", auth, getVehicleById);
