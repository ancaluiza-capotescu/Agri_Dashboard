const Request = require("../models/requestModel.js");
const User = require("../models/userModel.js");
const ErrorResponse = require("../utils/errorResponse");

function containsNumbers(str) {
    return /\d/.test(str);
}
function containsAnyLetters(str) {
    return /[a-zA-Z]/.test(str);
}
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
    return ((str.includes(" ")) && /^[A-Za-z ]+$/.test(str));
}
function checkCUI(str){
    return /^(RO)?[0-9]+$/.test(str);
}

exports.request=async(req,res,next) => {
    const {username, password, email, name, owner, CUI, address, phone, role, confirm_password, approved} = req.body;
    if(!username || !password || !role || !name || !email || !confirm_password){
        return next(new ErrorResponse("Completați toate câmpurile!", 400));
    }
    if(role != "administrator"){
        if(!owner || !phone || !CUI || !address){
            return next(new ErrorResponse("Completați toate câmpurile!", 400));
        }
    }
    try{
        const userSameUsernameUsers = await User.findOne({username});
        const userSameUsernameRequests = await Request.findOne({username});
        const userSameEmailUsers = await User.findOne({email});
        const userSameEmailRequests = await Request.findOne({email});
        const userSameCUIUsers = await User.findOne({CUI});

        if(userSameUsernameUsers || userSameUsernameRequests){
            return next(new ErrorResponse("Username-ul ales există deja!", 401));
        }
        if(userSameEmailUsers || userSameEmailRequests){
            return next(new ErrorResponse("Adresa de e-mail este deja folosită de un alt cont!", 401));
        }
        if(password != confirm_password){
            return next(new ErrorResponse("Parolele nu corespund!", 401));
        }
        if(username.length < 3){
            return next(new ErrorResponse("Username-ul trebuie să conțină minimum 3 caractere!"));
        }
        if(password.length < 6 || !containsNumbers(password) || !containsAnyLetters(password)){
            return next(new ErrorResponse("Parola trebuie să conțină minimum 6 caractere, atât cifre, cât și litere!"));
        }
        if(!validateEmail(email)){
            return next(new ErrorResponse("Adresa de e-mail trebuie să fie validă!"));
        }
        if(role != "administrator"){
            if(phone.length != 10 || !checkPhoneNo(phone)){
                return next(new ErrorResponse("Numărul de telefon trebuie să conțină exact 10 cifre și să fie valid!"));
            }
            if(owner.length < 3 || !checkOwnerName(owner)){
                return next(new ErrorResponse("Introduceți numele complet al directorului (nume și prenume)!"));
            }
            if(userSameCUIUsers){
                return next(new ErrorResponse("CUI-ul ales aparține altei firme!", 401));
            }
            if(CUI.length<2 || CUI.length>12 || !checkCUI(CUI)){
                return next(new ErrorResponse("Introduceți un CUI valid!"));
            }
            if(address.length < 3){
                return next(new ErrorResponse("Introduceți o adresă validă!"));
            }
        }
        if(approved)
            approved = false;

        const newRequest = new Request({
            username,
            password,
            email,
            name,
            owner,
            CUI,
            address,
            phone,
            role,
            approved
          });
          
          newRequest.save()
            .then(() => res.json('Request added!'))
            .catch(next);
    }catch(error){
        next(error);
    }
};