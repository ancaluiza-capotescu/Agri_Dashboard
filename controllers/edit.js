const User = require("../models/userModel.js");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcrypt");

function checkPhoneNo(str) {
    return ((str.includes("07", 0)) && /^\d+$/.test(str));
}

function validateEmail(email) 
{
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
function checkOwnerName(str){
    return ((str.includes(" ")) && /^[A-Za-z]+$/.test(str));
}


exports.edit=async(req,res,next) => {
    const {username, password, email, name, owner, CUI, address, phone, role} = req.body;
    if(!username  || !role || !name || !email ){
        return next(new ErrorResponse("Completați toate câmpurile!", 400));
    }
    if(!owner || !phone || !CUI || !address){
        return next(new ErrorResponse("Completați toate câmpurile!", 400));
    }
    try{
        const userSameUsername = await User.findOne({username});
        const userSameEmail = await User.findOne({email});

        if(userSameUsername && userSameUsername.CUI !== CUI){
            return next(new ErrorResponse("Username-ul ales există deja!", 401));
        }
        if(userSameEmail && userSameEmail.CUI !== CUI){
            return next(new ErrorResponse("Adresa de e-mail este deja folosită de un alt cont!", 401));
        }
        if(username.length < 3){
            return next(new ErrorResponse("Username-ul trebuie să conțină minimum 3 caractere!"));
        }
         if(!validateEmail(email)){
            return next(new ErrorResponse("Adresa de e-mail trebuie să fie validă!"));
        }
        if(role != "administrator"){
            if(phone.length != 10 || !checkPhoneNo(phone)){
                return next(new ErrorResponse("Numărul de telefon trebuie să conțină exact 10 cifre și să fie valid!"));
            }
            if(owner.length < 3 && !checkOwnerName(owner)){
                return next(new ErrorResponse("Introduceți numele complet al directorului (nume și prenume)!"));
            }

            if(address.length < 3){
                return next(new ErrorResponse("Introduceți o adresă validă!"));
            }
        }

        try{ 
            if(bcrypt.getRounds(req.body.password)!=10){
                const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            
            }
           User.findByIdAndUpdate(req.params.id, req.body)
           .then((data) => res.json(data))
           .catch(err =>
             res.status(400).json({ error: 'Unable to update the Database' })
           )
         
        }catch{
            const salt = await bcrypt.genSalt(10);
           req.body.password = await bcrypt.hash(req.body.password, salt);
            User.findByIdAndUpdate(req.params.id, req.body)
          .then((data) => res.json(data))
          .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
          )
        }
    }catch(error){
        next(error);
    }
       
      
    };





