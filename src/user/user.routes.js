import { Router } from "express";
import { UserController } from "./index";

const { signup, login } = UserController;

export default Router()
  .post("/api/v1/user/signup", signup)
  .post("/api/v1/user/login", login);
