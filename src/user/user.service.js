import { Op } from "sequelize";
import twilio from "twilio";
import { UserModel } from ".";
import { RoleModel } from "../roles";

const getUserByParams = async (
  { name, email, phone, id },
  role_required = false
) => {
  try {
    let filterArray = [];
    name && filterArray.push({ name });
    email && filterArray.push({ email });
    phone && filterArray.push({ phone });
    id && filterArray.push({ id });

    let user = null,
      query = { where: { [Op.or]: filterArray } };

    if (role_required) {
      query.include = [{ model: RoleModel, attributes: ["name", "id"] }];
    }

    user = await UserModel.findOne(query);
    return user;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const createUser = async (user) => {
  try {
    return await UserModel.create(user);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const verifyAndSendCode = async ({ phone }) => {
  try {
    const accountSid = "ACdfbec4f6951256592397083c7423cf12";
    const authToken = "4a0f39a364111ed9e65e259732cb1331";

    const client = twilio(accountSid, authToken);
    const verification = await client.verify.v2
      .services("VA57bb799381353139cfa81f0c607eff73")
      .verifications.create({
        to: "+91846099799",
        channel: "sms",
      });
    console.log("verification", verification);
  } catch (error) {
    console.log("error", error);
    return { error: true, message: error.message };
  }
};

export default { getUserByParams, createUser, verifyAndSendCode };
