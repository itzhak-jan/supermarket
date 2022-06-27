let connection = require("./connection-wrapper")


async function getAllProducts() {
    let sql = `SELECT p.id, p.name, c.name as category , p.unit_price as price, p.img , category_id as categoryID
    FROM supermarket.product p join supermarket.categories c
    on p.category_id = c.id
    order by p.category_id`
    let Products = await connection.execute(sql);
    return Products;
}

async function addProduct(product) {
    let sql = `INSERT INTO supermarket.product (name, category_id , unit_price , img)
    values(?, ?, ?,?)`;
    let parameters = [product.name, product.categoryID, product.price, product.img];
    await connection.executeWithParameters(sql, parameters);
    return;
}

async function updateProduct(product) {
    let sql = `UPDATE supermarket.product
    SET name = ? , category_id = ?, unit_price =? , img =?
    WHERE id = ?`;
    let parameters = [product.name, product.categoryID, product.price, product.img , product.id];
    await connection.executeWithParameters(sql, parameters);
    return;
}

async function getPramsToLoginPage() {
    let sql = `SELECT COUNT(DISTINCT o.id) AS amountOfOrders, 
    COUNT(DISTINCT p.id) AS amountOfProduct
    FROM supermarket.orders o 
    join supermarket.product p`
    let params = await connection.execute(sql);
    return params;
}
module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    getPramsToLoginPage
}
