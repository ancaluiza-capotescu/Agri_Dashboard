const DailyStatus = require("../models/dailyStatusModel.js");
const ErrorResponse = require("../utils/errorResponse");


exports.dailyStatus=async(req,res,next) => {
    const {username, status} = req.body;
    if(!status){
        return next(new ErrorResponse("Completați toate câmpurile", 400));
    }

    try{
        const newDailyStatus = new DailyStatus({
            username,
            status,
          });
      
          newDailyStatus.save()
            .then(() => res.json('Daily status saved'))
            .catch(err => res.status(400).json('Error: ' + err));
    }catch(error){
        next(error);
    }
};