let connection = require("./connection-wrapper")



async function getMyCart(id) {
    let sql = `SELECT pc.id , p.name , pc.count as amount , p.unit_price as price , p.img , p.id as productId
    FROM supermarket.product_cart pc join supermarket.carts c
    on pc.cart_id = c.id
    join supermarket.product p
    on pc.product_id = p.id
    join supermarket.users u
    on c.user_id = u.id
    where u.id = ?
    and c.date_end is null`;
    let parameters = [id];
    let myCart = await connection.executeWithParameters(sql, parameters);
    return myCart;
}

async function chackCartOpen(userId) {
    let sql = `SELECT c.id 
    FROM supermarket.carts c join supermarket.users u
    on c.user_id = u.id
    where c.user_id = ?
    and c.date_end is null`;
    let parameters = [userId];
    let cartId = await connection.executeWithParameters(sql, parameters);
    return cartId[0].id;
}

async function closeCart(user) {
    let sql = `UPDATE supermarket.carts
    SET supermarket.carts.date_end = ?
    WHERE supermarket.carts.user_id = ?
    and supermarket.carts.id = ?`;
    let parameters = [user.date, user.id, user.cartId];
    await connection.executeWithParameters(sql, parameters);
    return
}

async function openCart(user) {
    let sql = `INSERT INTO supermarket.carts (user_id , date_start)
    values(?, ?)`;
    let parameters = [user.id, user.date];
    await connection.executeWithParameters(sql, parameters);
    return
}


async function cleanCart(cart) {
    let sql = `DELETE FROM supermarket.product_cart
    WHERE cart_id = ?`;
    let parameters = [cart.id];
    await connection.executeWithParameters(sql, parameters);
    return
}


async function updateDate(cart) {
    let sql = `UPDATE supermarket.carts
        SET supermarket.carts.date_start = ?
        WHERE supermarket.carts.id = ? `;
    let parameters = [cart.date, cart.id];
    await connection.executeWithParameters(sql, parameters);
    return
}





module.exports = {
    getMyCart,
    chackCartOpen,
    closeCart,
    openCart,
    cleanCart,
    updateDate
}
