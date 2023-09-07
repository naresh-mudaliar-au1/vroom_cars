import { Sequelize } from "sequelize";
import { UserModel, userServices } from "../user";
import { VehicleModel } from "../vehicle";
// import { ServiceBookingModel } from "./model";
import ServiceBooking from "./model/service_booking.model";
import ServiceCentreModel from "./model/service_centres.model";
import ServiceTypes from "./model/service_type.model";

const createBooking = async (data) => {
  try {
    const saveBooking = await ServiceBooking.create({ ...data });
    return saveBooking;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getBookings = async (role, user_id, page, limit) => {
  try {
    let response = {},
      query = {},
      pagination = {};
    if (page && limit) {
      pagination.offset = (page - 1) * limit;
      pagination.limit = limit;
    }

    if (role.name === "user") {
      query.where = { user_id };
    } else {
      let serviceCentre = await getServiceById(user_id);
      if (serviceCentre.error) throw new Error(serviceCentre.message);
      query.where = { service_centre_id: serviceCentre.data.id };
    }
    query.include = [
      {
        model: ServiceCentreModel,
        as: "service_centre",
        attributes: ["name"],
      },
      { model: ServiceTypes, as: "service_type", attributes: ["name"] },
      {
        model: VehicleModel,
        attributes: ["name"],
        as: "vehicle",
        include: { model: UserModel, attributes: ["name"] },
      },
    ];
    query.attributes = [
      [Sequelize.col("service_centre.name"), "service_centre_name"],
    ];

    const { count, rows } = await ServiceBooking.findAndCountAll({
      ...query,
      ...pagination,
    });
    response.count = count;
    response.rows = rows;
    return { error: false, data: response };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getServiceById = async (id) => {
  try {
    const getCentre = await ServiceCentreModel.findOne({
      where: { owner: id },
    });
    if (!getCentre) throw new Error("Please Login Again!");
    return { error: false, data: getCentre.toJSON() };
  } catch (error) {
    console.log("Error While fetching service centre!!", error.message);
    return { error: true, message: error.message };
  }
};

const updateStatus = async (data) => {
  try {
    const updateStatus = await ServiceBooking.update(
      { status: data.status },
      {
        where: {
          id: data.id,
        },
      }
    );

    return { error: false, data: updateStatus };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export default { createBooking, getBookings, updateStatus };
