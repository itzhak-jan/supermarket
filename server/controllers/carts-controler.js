const express = require("express");
const router = express.Router();
const cartsLogic = require('../logic/carts-logic');
const jwt_decode = require('jwt-decode');
const ordersLogic = require('../logic/orders-logic')


router.get("/", async (request, response) => {

    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)
    id = decodedHeader.userId

    try {
        let myCart = await cartsLogic.getMyCart(id);
        response.json(myCart)
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.put("/", async (request, response) => {

    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)
    id = decodedHeader.userId

    try {
        await cartsLogic.cleanCart(id);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.post("/", async (request, response) => {

    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)
    let order = request.body
    order.userId = decodedHeader.userId

    try {
        let reception = await ordersLogic.addOrder(order);
        response.json(reception)
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});


module.exports = router;