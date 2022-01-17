const regEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
const regThaiChar = /^[ก-์]+$/;
const regPhoneNumber = /^[0-9]*$/;
module.exports = {regEmail,regThaiChar,regPhoneNumber} ;