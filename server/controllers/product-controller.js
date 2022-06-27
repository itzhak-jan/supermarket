const express = require("express");
const router = express.Router();
const productsLogic = require('../logic/product-logic');
const jwt_decode = require('jwt-decode');


router.get("/", async (request, response) => {
    try {
        let products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.post("/", async (request, response) => {
    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)

    let userType = decodedHeader.userType
    let product = request.body;

    try {
        if(userType != "admin"){
            throw new Error("your not admin!!")
        }
        await productsLogic.addProduct(product);
        response.json();
    }
    catch (e) {
        
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.put("/", async (request, response) => {
    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)

    let userType = decodedHeader.userType
    let product = request.body;

    try {
        if(userType != "admin"){
            throw new Error("your not admin!!")
        }
        await productsLogic.updateProduct(product);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});


router.get("/Login-page", async (request, response) => {
    try {
        let params = await productsLogic.getPramsToLoginPage();
        response.json(params);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

module.exports = router;