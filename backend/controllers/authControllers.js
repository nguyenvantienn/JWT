const bcrypt = require("bcrypt"); //Giau mat khau trong DB
const jwt = require("jsonwebtoken");
const User = require("../models/User");


let refreshTokens = [];
const authController = {
    //Test
    test : async(req,res) =>{
        res.status(200).json("OKOK-Bro");
    },

	//Register --Dang ki tao User
	registerUser: async (req, res) => {
		try {
			//Xu ly giau password
			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(req.body.password, salt);

			//Create new user
			const newUser = await new User({
				username: req.body.username,
				email: req.body.email,
				password: hashed,
			});

			//Save to DB
			const user = await newUser.save();
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json(error);
		}
	},

    //GENERATE TOKEN
    generateToken : (user, time) =>{
        return jwt.sign(
            {
                //Thong tin muon kem vao khi tao jwt
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY, //AccessKey - Ma bi mat,
            { expiresIn: time }, //Thoi gian JWT het han
        )
    },

	//Login --Dang nhap
	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({ username: req.body.username });
			if (!user) {
				return res.status(404).json("wrong username-- Login false");
			}
			const validPassword = await bcrypt.compare(
				req.body.password,
				user.password,
			);
			if (!validPassword) {
				return res.status(404).json("Wrong Password");
			}
			if (user && validPassword) {
				//Khi dang nhap thanh cong => Tao JWT
				const accessToken = authController.generateToken(user,"20h");
                //Tao refresh token
                const refreshToken = authController.generateToken(user,"365d");
                refreshTokens.push(refreshToken);
                //Luu refreshToken vao cookie
                res.cookie("refreshToken",refreshToken,{
                    httpOnly:true,
                    secure:false,
                    path:"/",
                    sameSite: "strict",
                })
                const {password , ...rest} = user._doc;
				res.status(200).json({...rest , accessToken});
			}
		} catch (error) {
			res.status(500).json(error);
		} 
	},

    requestRefreshToken : async(req, res)=>{
        //Lay refresh token tu user
        const refreshToken = req.cookie.refreshToken;
        if(!refreshToken) return res.staus(401).json("You are not authenticated");
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("RefreshToken is not valid");
        }
        // res.status(200).json(refreshToken);
        jwt.verify(refreshToken , process.env.JWT_REFRESH_KEY , (err,user)=>{
            if(err){
                return res.status(401).json(err);
            }
            refreshTokens = refreshTokens.filter((token)=> token !== refreshToken);
            //Tao AccessToken , refreshToken moi
            const newAccessToken = authController.generateToken(user,"20h");
            const newRefreshToken = authController.generateToken(user,"365d");
            refreshTokens.push(newRefreshToken);
            //Luu lai newRefreshToken vao cookie
            res.cookie("refreshToken",newRefreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite: "strict",
            });
            res.status(200).json({accessToken: newAccessToken});
        })
    },

    //Logout
    userLogout: async(req,res)=>{
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => req.cookies.refreshToken);
        res.status(200).json("Logout successfully");
    }
};

module.exports = authController;
