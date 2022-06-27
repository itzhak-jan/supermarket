const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');
const ordersLogic = require('../logic/orders-logic')
const res = require('express/lib/response')
const fs = require('fs/promises')
const req = require('express/lib/request')

router.get("/", async (request, response) => {

    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)
    let userType = decodedHeader.userType

    try {
        if (userType != "admin") {
            throw new Error("your not admin!!")
        }
        let orders = await ordersLogic.getAllOrders();
        response.json(orders)
    }
    catch (e) {
        console.error(e);
        response.status(418).send(e.message)
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

router.post("/Download-receipt", async (request, response) => {

    let prducts = request.body ;
    console.log(prducts);
    const id = Math.random().toString().replace('0.','') 
    let str = 'Recipe No. ' + id
    for (const product of prducts) {
        str += `
        ${product.prodName} ||
        ${product.price} * ${product.count}units = ${product.price*product.count}₪
        _______________________________`
    }

    try {
        await fs.writeFile(id+'.txt', str)
        console.log('File created');
        res.json({id})
        res.sendFile(__dirname+'/'+req.params.id+'.txt')
    } catch (err) {
        console.log(err);
    }
 

});

module.exports = router;
