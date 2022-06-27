const express = require("express");
const router = express.Router();
const productCartsLogic = require('../logic/product-cart-logic');
const jwt_decode = require('jwt-decode');



router.post("/", async (request, response) => {
    let productData = request.body;

    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)
    productData.userId = decodedHeader.userId
    //So far I am producing a Json with 2 fields - userID and productID

    try {
        await productCartsLogic.addToMyCarts(productData);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.put("/", async (request, response) => {
    let productData = request.body;

    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)
    productData.userId = decodedHeader.userId

    try {
        await productCartsLogic.ChangeAmount(productData);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.delete("/:id", async (request, response)  => {
    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)

    let productData = {
        productId: request.params.id,
        userId: decodedHeader.userId
    }
    try {
        await productCartsLogic.deleteFromMyCart(productData);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

module.exports = router;