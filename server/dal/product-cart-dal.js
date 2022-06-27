let connection = require("./connection-wrapper")



async function addToMyCarts(productData) {
    let sql = `INSERT INTO supermarket.product_cart (product_id, count , cart_id)
    values(?, ?, ?)`;

    let parameters = [productData.productId, productData.amount, productData.cartId];

    await connection.executeWithParameters(sql, parameters);
    return;
}

async function ChangeAmount(productData) {
    let sql = `UPDATE supermarket.product_cart
    SET count = ?
    WHERE product_id = ?
    and cart_id = ?`;
    let parameters = [productData.amount, productData.productId, productData.cartId];
    await connection.executeWithParameters(sql, parameters);
    return;
}

async function deleteFromMyCart(productData) {
    let sql = `DELETE FROM supermarket.product_cart
    WHERE product_id = ? 
    and cart_id = ? `;
    let parameters = [productData.productId, productData.cartId];
    await connection.executeWithParameters(sql, parameters);
    return;
}

async function ProductAlreadyInCart(productData) {
    let sql = `select id FROM supermarket.product_cart
    WHERE product_id = ? 
    and cart_id = ? `;
    let parameters = [productData.productId, productData.cartId];
    let valid = await connection.executeWithParameters(sql, parameters);

    if (valid && valid.length > 0) {
        return true;
    }
    return false;
}


async function findConst(order) {
    let sql = `select sum(pc.count * p.unit_price) as sum
    FROM supermarket.product_cart pc join supermarket.product p
    on pc.product_id = p.id
        WHERE cart_id = ? `;
    let parameters = [order.cartId];
    console.log(parameters);
    let constCart = await connection.executeWithParameters(sql, parameters);
    console.log(constCart);
    return constCart[0].sum;
}


module.exports = {
    addToMyCarts,
    ChangeAmount,
    deleteFromMyCart,
    ProductAlreadyInCart,
    findConst
}
