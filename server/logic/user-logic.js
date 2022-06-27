const usersDal = require('../dal/user-dal');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const cartsLogic = require('../logic/carts-logic');


async function addUser(userRegisterData) {
    validateUserData(userRegisterData);
    if (await usersDal.isUserMailExist(userRegisterData.mail)) {
        throw new Error("User userMail already exist");
    }
    userRegisterData.password = encryptPassword(userRegisterData.password);
    let id = await usersDal.addUser(userRegisterData);
    await cartsLogic.openCart(id)
}

async function login(userLoginData) {
    if (!userLoginData.email) {
        throw new Error("mail empty");
    }
    if (!userLoginData.password) {
        throw new Error("password empty");
    }
    userLoginData.password = encryptPassword(userLoginData.password);

    let userData = await usersDal.login(userLoginData);
    if (!userData) {
        throw new Error("Login failed");
    }
    userData = userData[0];
    userName = userData.name;
    userType = userData.status;
    cartDate = userData.cartDate;
    totalPrice = userData.totalPrice;

    const token = jwt.sign({ userId: userData.id, userType: userData.status, userName: userData.name }, config.secret);
    let successfulLoginResponse = { token, userType, userName, cartDate, totalPrice };

    console.log(successfulLoginResponse);
    return successfulLoginResponse;
}



function validateUserData(userRegistrationData) {
    if (!userRegistrationData.userName) {
        throw new Error("Missing data please try again");
    }

    if (!userRegistrationData.password) {
        throw new Error("Missing data please try again");
    }

    if (userRegistrationData.password.length < 6) {
        throw new Error("Password is too short");
    }
    if (!userRegistrationData.mail) {
        throw new Error("Missing data please try again");
    }

    if (!userRegistrationData.cardID) {
        throw new Error("Missing data please try again");
    }

    if (!userRegistrationData.city) {
        throw new Error("Missing data please try again");
    }
    if (!userRegistrationData.adress) {
        throw new Error("Missing data please try again");
    }
    if (!userRegistrationData.birthDate) {
        throw new Error("Missing data please try again");
    }
}

function encryptPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}







module.exports = {
    addUser,
    login
}