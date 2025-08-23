const Validator = require('validator');

const ValidateSignUpData = (req)=>{
    const {firstName , lastName , email  , password} = req.body
    if (!firstName && !lastName){
        throw  new Error ("Name is not Valid ")
    }else if(firstName.length < 4 || firstName.length>50) {
        throw new Error ("firstname should be 4 - 50 characters")

    }else if(!Validator.isEmail(email)) {
        throw new Error ("Email id is not correct")

    }else if(!Validator.isStrongPassword(password)){
        throw new Error("Password should be strong")
    }

}
module.exports = {
    ValidateSignUpData
}