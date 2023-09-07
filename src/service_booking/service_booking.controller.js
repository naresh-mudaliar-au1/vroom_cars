import { ServiceBookingService } from "./";
import ServiceCentreModel from "./model/service_centres.model";
import ServicesType from "./model/service_type.model";

//User CreateBooking
const createBooking = async (req, res) => {
  try {
    const { currentUser, body } = req;

    const createBooking = await ServiceBookingService.createBooking({
      ...body,
      user_id: currentUser.id,
    });
    if (createBooking.error) throw new Error(createBooking.message);

    return (
      createBooking &&
      res.status(200).send({
        success: true,
        message: "Service booking done!",
        data: createBooking,
      })
    );
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};

//Get Bookings
const getBookingBasedOnAuth = async (req, res) => {
  try {
    const { currentUser } = req;
    const { Role } = currentUser;
    const bookings = await ServiceBookingService.getBookings(
      Role,
      currentUser.id
    );
    if (bookings.error) throw new Error(bookings.message);
    
    return res.status(200).send({
      success: true,
      message: "Service booking done!",
      data: bookings.data,
    });
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};

//ServiceCentre status update!
const updateServiceStatus = async (req, res) => {
  try {
    const { body, params } = req;
    const { status } = body;

    const updateStatus = await ServiceBookingService.updateStatus({
      status,
      id: params.id,
    });

    updateStatus &&
      res.status(200).send({
        success: true,
        message: "Status updated succeessfully!",
      });
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};

const addServiceCentre = async (req, res) => {
  try {
    const { body } = req;
    const createCentre = await ServiceCentreModel.create({ ...body });

    createService &&
      res.status(200).send({ success: true, data: createCentre });
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};

const addServiceType = async (req, res) => {
  try {
    const { body } = req;
    const serviceType = await ServicesType.create({ ...body });

    serviceType && res.status(200).send({ success: true, data: serviceType });
  } catch (error) {
    console.log("er", error.message);
    return res.status(400).send({ success: false, Error: error.message });
  }
};

export default {
  createBooking,
  getBookingBasedOnAuth,
  updateServiceStatus,
  addServiceCentre,
  addServiceType,
};
