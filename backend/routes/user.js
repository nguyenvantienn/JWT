
const router = require("express").Router();

const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

//Get all users
router.get('/',middlewareController.verifyToken , userController.getAllUsers);
//Delete User
router.delete("/:id" ,middlewareController.verifyTokenAndAdminAuth ,userController.deleteUser);

module.exports = router;