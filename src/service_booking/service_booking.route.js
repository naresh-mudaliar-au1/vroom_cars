import { Router } from "express";
import ServiceBookingController from "./service_booking.controller";
import auth from "../middleware/auth";

const {
  createBooking,
  getBookingBasedOnAuth,
  updateServiceStatus,
  addServiceCentre,
  addServiceType,
} = ServiceBookingController;

export default Router()
  .post("/api/v1/booking/create", auth, createBooking)
  .get("/api/v1/booking/", auth, getBookingBasedOnAuth)
  
  //Add service centre
  .post("/api/v1/service", addServiceCentre)
  .put("/api/v1/service/:id", auth, updateServiceStatus)

  //Add service type
  .post("/api/v1/service/type", addServiceType);
