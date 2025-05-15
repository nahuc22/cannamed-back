const { Router } = require("express");

const { 
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require("../controllers/userController.js")

const userRouters = Router();
userRouters.get("/", getAllUsers)
userRouters.get("/:id", getUser)
userRouters.post("/", createUser)
userRouters.put("/:id", updateUser);
userRouters.delete("/:id", deleteUser);

module.exports = userRouters;
