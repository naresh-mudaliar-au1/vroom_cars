import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RoleModel } from "../roles";
import { requestValidator, userServices } from "./";

const signup = async (req, res) => {
  try {
    const { body } = req;
    const { error } = requestValidator.userValidationSchema.validate(body);
    if (error) throw new Error(error.message);

    const user = await userServices.getUserByParams(body);
    if (user) throw new Error("User Already Exist!");

    // const sendCode = await userServices.verifyAndSendCode(body);
    // console.log("sendCode", sendCode);

    let role = await RoleModel.findOne({
      where: { name: "user" },
    });

    role = role.toJSON();

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(body.password, saltRounds);

    let userObj = Object.assign({}, body);

    let createdUser = await userServices.createUser({
      ...userObj,
      role_id: role.id,
      password: hashedPassword,
    });

    return res.status(200).send({
      success: true,
      message: "You Have Been Registered",
      data: createdUser,
    });
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;

    const { error } = requestValidator.userloginSchema.validate(body);
    if (error) throw new Error(error.message);

    const { name, email, password } = body;

    let checkUser = await userServices.getUserByParams({ name, email }, true);
    if (!checkUser || checkUser.error) throw new Error("User Does Not Exist Please Register");

    checkUser = checkUser.toJSON();
    const verifyPassword = await bcrypt.compare(password, checkUser.password);
    if (!verifyPassword) throw new Error("Wrong Password");

    const secretKey = process.env.SECRETKEY;
    const token =
      verifyPassword && jwt.sign({ name: checkUser.name }, secretKey);

    return (
      verifyPassword &&
      res.status(200).send({
        success: true,
        message: "Login Successful",
        name: checkUser.name,
        role: checkUser.Role.name,
        auth: token,
      })
    );
  } catch (error) {
    return res.status(400).send({ success: false, Error: error.message });
  }
};

export default { signup, login };
