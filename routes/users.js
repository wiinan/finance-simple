const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const userController = require("../controller/userController");
const verify = require("../schema/validate");
const users = require("../schema/users");

const routes = express.Router();

routes.post("/signup", verify(users.store), userController.store);
routes.post("/login", verify(users.login), userController.login);

routes.use(verifyToken);

routes.get("/profile", userController.index);
routes.put("/update/:id", verify(users.update), userController.update);
routes.delete("/delete/:id", verify(users.delete), userController.delete);

module.exports = routes;
