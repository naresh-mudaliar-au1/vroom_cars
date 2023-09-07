import { Op } from "sequelize";
import { VehicleModel } from "./";

const addVehicle = async (user, vehicleDetails) => {
  try {
    const vehicle = await VehicleModel.create({
      ...vehicleDetails,
      owner: user.id,
    });
    return { error: false, data: vehicle };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getUserVehicles = async (user, page, limit) => {
  try {
    const offset = (page - 1) * limit;

    const { count, rows } = await VehicleModel.findAndCountAll({
      where: { owner: user.id },
      offset,
      limit: limit,
    });
    return { error: false, data: rows.map((e) => e.toJSON()), count };
  } catch (error) {
    console.log('error', error)
    return { error: true, message: error.message };
  }
};

const updateVehicle = async (data) => {
  try {
    const vehicle = await VehicleModel.findOne({ where: { id: data.id } });

    if (!vehicle) throw new Error("Vehicle not found!");

    const updatedData = await VehicleModel.update(data, {
      where: {
        id: data.id,
      },
    });
    return { error: false, data: updatedData };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const duplicateVehicle = async (data) => {
  try {
    const vehicle = await VehicleModel.findOne({
      where: { [Op.and]: data },
    });
    return { error: false, data: vehicle };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export default { addVehicle, getUserVehicles, updateVehicle, duplicateVehicle };
