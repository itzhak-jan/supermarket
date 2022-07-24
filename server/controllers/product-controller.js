const express = require("express");
const router = express.Router();
const productsLogic = require('../logic/product-logic');
const login_Filter = require('../middleware/login-filter')


router.get("/", async (request, response) => {
    try {
        let products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (e) {
        console.error(e);
        response.status(400).send(e.message)
    }
});

router.post("/", async (request, response) => {
    try {
        let product = request.body;
        let userType = request.body.token.userType

        if(userType != "admin"){
            throw new Error("your not admin!!")
        }
        await productsLogic.addProduct(product);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(400).send(e.message)
    }
});

router.put("/", async (request, response) => {
    try {
        let product = request.body;
        let userType = request.body.token.userType

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


module.exports = router;