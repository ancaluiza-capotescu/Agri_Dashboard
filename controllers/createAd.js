const Ad = require("../models/adModel.js");
const ErrorResponse = require("../utils/errorResponse");

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontend/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
})

const upload = multer({storage: storage});

exports.createAd=async(req,res,next) => {
    const {username, description, title, owner, price, address, contact,  picture} = req.body;
    if(!username || !description || !title || !owner || !price || !address || !contact){
        return next(new ErrorResponse("Completați toate câmpurile", 400));
    }
    try{
       


        const newAd = new Ad({
            username, description, title, owner, price, address, contact,  picture
          });
          
          newAd.save()
            .then(() => res.json('Ad added!'))
            .catch(next);
    }catch(error){
        next(error);
    }
};