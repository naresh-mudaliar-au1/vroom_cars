import { vehicleService, validation } from "./";

const addVehicle = async (req, res) => {
  try {
    const { body, currentUser } = req;
    const { error } = validation.vehicleValidation.validate(body);
    if (error) throw new Error(error.message);

    const { name, engine_number, model } = body;
    let filterArray = [
      { name },
      { engine_number },
      { model },
      { owner: currentUser.id },
    ];

    const validateVehicle = await vehicleService.duplicateVehicle(filterArray);
    if (validateVehicle.error) throw new Error(validateVehicle.message);

    if (validateVehicle.data) throw new Error("Vehicle already exist!");

    const addVehicle = await vehicleService.addVehicle(currentUser, body);
    if (addVehicle.error) throw new Error(addVehicle.message);

    return res.status(200).send({
      success: true,
      message: "Vehicle added successfully!",
      data: addVehicle.data,
    });
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};

const getVechileByUser = async (req, res) => {
  try {
    const { currentUser } = req;
    let { page, limit } = req.query;
    if (!page || !limit) {
      page = 1;
      limit = 20;
    }
    const list = await vehicleService.getUserVehicles(
      currentUser,
      +page,
      +limit
    );
    if (list.error) throw new Error(list.message);

    return res.status(200).send({
      success: true,
      message: "Vehicles list fetched successfully!",
      vehicles: list.data,
      count: list.count,
    });
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { body } = req;

    const updateVehicle = await vehicleService.updateVehicle(body);
    if (updateVehicle.error) throw new Error(updateVehicle.message);

    return res.status(200).send({
      success: true,
      message: "Vehicle Updated Successfully!",
      vehicle: updateVehicle.data,
    });
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const { currentUser } = req;
    const { id } = req.params;

    const vehicle = await vehicleService.duplicateVehicle([
      { id },
      { owner: currentUser.id },
    ]);
    if (vehicle.error) throw new Error(vehicle.message);

    return res.status(200).send({
      success: true,
      message: "Vehicle Data fetched Successfully!",
      vehicle: vehicle.data,
    });
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};
export default { addVehicle, getVechileByUser, updateVehicle, getVehicleById };
