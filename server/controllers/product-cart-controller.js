const express = require("express");
const router = express.Router();
const productCartsLogic = require('../logic/product-cart-logic');



router.post("/", async (request, response) => {
    //So far I am producing a Json with 2 fields - userID and productID
    try {
        let productData = request.body;
        productData.userId = request.body.token.userId

        await productCartsLogic.addToMyCarts(productData);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(400).send(e.message)
    }
});

router.put("/", async (request, response) => {

    try {
        let productData = request.body;
        productData.userId = request.body.token.userId

        await productCartsLogic.ChangeAmount(productData);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(400).send(e.message)
    }
});

router.delete("/:id", async (request, response)  => {
    try {
        let productData = {
            productId: request.params.id,
            userId: request.body.token.userId
        }        
        await productCartsLogic.deleteFromMyCart(productData);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(400).send(e.message)
    }
});

module.exports = router;