import joi from "joi";

const userValidationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(8).trim(true).required(),
  phone: joi.string().required(),
});

const userloginSchema = joi.object({
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(8).trim(true).required(),
});

export default { userValidationSchema, userloginSchema };
