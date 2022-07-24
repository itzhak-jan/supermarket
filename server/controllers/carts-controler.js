const express = require("express");
const router = express.Router();
const cartsLogic = require('../logic/carts-logic');
const ordersLogic = require('../logic/orders-logic')
const loginFilter = require('../middleware/login-filter')


router.get("/", async (request, response) => {

    try {
        let id = request.body.token.userId;
        let myCart = await cartsLogic.getMyCart(id);
        response.json(myCart)
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.put("/", async (request, response) => {
    try {
        let id = request.body.token.userId;
        await cartsLogic.cleanCart(id);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.post("/", async (request, response) => {

    try {
        let order = request.body
        order.userId = request.body.token.userId

        let reception = await ordersLogic.addOrder(order);
        response.json(reception)
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});


module.exports = router;