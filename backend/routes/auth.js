const authController = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();


//Test
router.get("/test",authController.test);
//Register --Dang ki
router.post("/register",authController.registerUser);
//Login -- Dang nhap
router.post("/login",authController.loginUser);

//Refresh 
router.post("/refresh",authController.requestRefreshToken);

//LogOut
router.post("/logout",middlewareController.verifyToken ,authController.userLogout);

module.exports = router;
