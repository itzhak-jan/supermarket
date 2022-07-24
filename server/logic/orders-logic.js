const ordersDal = require('../dal/orders-dal');
const cartsLogic = require('../logic/carts-logic');
const productCartsDal = require('../dal/product-cart-dal');


async function getAllOrders() {
    let orders = await ordersDal.getAllOrders()
    return orders;
}


async function getFullDays() {
    let ordersDays = await ordersDal.getFullDays()
    console.log(ordersDays);
    console.log("___________________________________________________");
    let fullDays = ordersDays.filter(day => {return day.count >= 3})
    console.log(fullDays);
    return fullDays;
}


async function addOrder(order) {

    if (!order.cartId) {
        let cartId = await cartsLogic.chackCartOpen(order.userId)
        order.cartId = cartId
    }
    order.dateEnd = new Date
    order.const = await productCartsDal.findConst(order)

    await ordersDal.addOrder(order);
    await cartsLogic.creatingCartFollowingPayment(order.userId)
    let reception = await ordersDal.creatReception(order)
    return reception;
}

module.exports = {
    getAllOrders,
    addOrder,
    getFullDays
}