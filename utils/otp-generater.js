const otpGenerator = require('otp-generator');

exports.OTPpassword = ()=>{
    let otp = otpGenerator.generate(5, {alphabets:false, upperCase: false, specialChars: false });
    return otp;
}