const users = require("../models/userModel.js");
const ErrorResponse = require("../utils/errorResponse");
exports.login=async(req,res,next) => {
    const {username,password} = req.body;

    if(!username || !password ){
        return next(new ErrorResponse("Completați toate câmpurile", 400));
    }
    try{
        const user = await users.findOne({username}).select('+password');

        if(!user){
            return next(new ErrorResponse("Username incorect", 401));
        }
        const isMatchPass = await user.matchPasswords(password);
        if(!isMatchPass){
            return next(new ErrorResponse("Parolă incorectă", 401));

        }
       

       return res.status(200).json({
            success:true,
            token:"tr34f3443fc",
        });
    }catch(error){
        next(error);
    }
};