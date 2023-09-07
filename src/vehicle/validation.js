import joi from "joi";

const vehicleValidation = joi.object({
  name: joi.string().required(),
  engine_number: joi.string().required(),
  make: joi.string().required(),
  model: joi.string().required(),
});

export default { vehicleValidation };
