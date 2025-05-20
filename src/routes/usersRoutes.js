import { Router } from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const userRouters = Router();

userRouters.get("/", getAllUsers);
userRouters.get("/:id", getUser);
userRouters.post("/", createUser);
userRouters.put("/:id", updateUser);
userRouters.delete("/:id", deleteUser);

export default userRouters;
