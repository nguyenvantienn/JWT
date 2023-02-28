
const User = require("../models/User");

const userController = {
    //Get all user - Lay tat ca cac user
    getAllUsers : async(req,res)=>{
        try {
            const allUser = await User.find();
            res.status(200).json(allUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //Delete user -- Xoa 1 user
    deleteUser : async(req,res)=>{
        try {
            // const user = await User.findByIdAndDelete(req.params.id);
            const user = await User.findById(req.params.id);
            res.status(200).json(`Delete successfully ${user.username}`);
        } catch (error) {
            res.status(500).json(error);
        }
    }

};

module.exports = userController;