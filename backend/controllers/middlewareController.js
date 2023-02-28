const jwt = require("jsonwebtoken");

const middlewareController = {
    //verifyToken --Xac nhan lai token
    verifyToken :(req,res,next) =>{
        const token = req.headers.token;
        if(token){
            //token : Bearer 123456(token)
            const accessToken = token.split(" ")[1];
            // Chung nhan JWT
            jwt.verify(accessToken , process.env.JWT_ACCESS_KEY ,(err,user)=>{
                if(err){
                    // 403 bi ngan can
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();//Di tiep (vuot qua Middleware)
            });
        }
        else{
            res.status(401).json("You are not authenticated");
        }
    },
    //Xac thuc chinh chu hoac co quyen Admin
    verifyTokenAndAdminAuth: (req,res,next) =>{
        middlewareController.verifyToken(req,res, ()=>{
            if(req.user.id === req.params.id || req.user.admin){
                next();
            }
            else{
                res.status(403).json("You are not allowed to delete other");
            }
        })
    }
}

module.exports = middlewareController;