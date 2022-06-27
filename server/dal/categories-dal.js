let connection = require("./connection-wrapper")


async function getAllCategories() {
    let sql = `SELECT id,name FROM supermarket.categories`
    let categories = await connection.execute(sql);
    return categories;
}

module.exports = {
    getAllCategories
}
