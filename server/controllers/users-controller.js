const express = require("express");
const router = express.Router();
const usersLogic = require('../logic/user-logic');


router.post("/", async (request, response, next) => {
    let userRegisterData = request.body;
    console.log(userRegisterData);

    try {
        userRegisterData.status = "user"
        await usersLogic.addUser(userRegisterData);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});


router.post('/login', async (request, response) => {
    // Extracting the JSON from the packet's BODY
    let userLoginData = request.body;

    try {
        let successfulLoginResponse = await usersLogic.login(userLoginData);
        response.json(successfulLoginResponse);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});




module.exports = router;