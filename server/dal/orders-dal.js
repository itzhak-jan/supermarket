let connection = require("./connection-wrapper")


async function getAllOrders() {
    let sql = `SELECT o.id, u.name as user, o.const as totalPrice, o.date_order as dateOrder, count(c.id) as amountOfProduct
    FROM supermarket.orders o
    join supermarket.users u
    on o.user_id = u.id
    join supermarket.carts c
    on o.cart_id = c.id
    join supermarket.product_cart pc
    on pc.cart_id = c.id
    join supermarket.product p
    on pc.product_id = p.id
    group by(c.id)`
    let orders = await connection.execute(sql);
    return orders;
}

async function addOrder(order) {
    let sql = `INSERT INTO supermarket.orders
    (user_id , date_shipment , date_order , adress , const ,credit_card , cart_id)
    values(?, ?, ?, ?, ?, ?, ?)`;
    let parameters = [order.userId, order.dateEnd,
    order.dateToShipment, order.adress, order.const,
    order.creditCard, order.cartId];
    console.log(parameters);
    await connection.executeWithParameters(sql, parameters);
    return
}

async function creatReception(order) {
    let sql = `SELECT u.name as useraName , o.date_shipment as orderDate, 
    o.date_order as shipmentDate, o.adress, p.name as prodName, 
    p.unit_price as price , pc.count, c.id, o.credit_card as creditCard , o.const
    FROM supermarket.orders o
    join supermarket.users u 
    on o.user_id = u.id
    join supermarket.carts c
    on o.cart_id = c.id
    join supermarket.product_cart pc
    on pc.cart_id = c.id
    join supermarket.product p
    on pc.product_id = p.id
    where c.id = ?`;
    let parameters = [order.cartId];
    console.log("creatReception");
    let reception = await connection.executeWithParameters(sql, parameters);
    return reception
}

module.exports = {
    getAllOrders,
    addOrder,
    creatReception
}
