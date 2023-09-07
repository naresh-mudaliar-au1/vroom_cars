import jwt from "jsonwebtoken";
import { userServices } from "../user";

const auth = async (req, res, next) => {
  try {
    console.log("req", req.originalUrl);
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Access denied. No token provided");

    const token =
      authorization && authorization.startsWith("Bearer ")
        ? authorization.slice(7, authorization.length)
        : null;
    const mySecretKey = process.env.SECRETKEY || "mytoken";

    const verifyToken = jwt.verify(token, mySecretKey);

    const name = verifyToken.name;

    let getUser = await userServices.getUserByParams({ name }, true);
    if (!getUser) throw new Error("Token Not Valid");

    getUser = getUser.toJSON();
    let path = await req.originalUrl.substring(0, req.originalUrl.length - 2);
    if (
      path === "/api/v1/service" &&
      getUser &&
      getUser.Role.name === "service_centre"
    ) {
      throw new Error("You are unauthorized to perform this Action! auth");
    }

    req.currentUser = getUser;
    next();
  } catch (error) {
    res.status(403).send({ Error: error.message });
  }
};

export default auth;
