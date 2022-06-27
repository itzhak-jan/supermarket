let connection = require("./connection-wrapper")

async function addUser(userRegisterData) {
    let sql = `INSERT INTO supermarket.users (name , email , password , card_id , adress ,city , birth_date , status)
    values(?, ?, ?, ?, ?, ?, ?, ?)`;
    let parameters = [userRegisterData.userName, userRegisterData.mail, userRegisterData.password,
    userRegisterData.cardID, userRegisterData.adress, userRegisterData.city,
    userRegisterData.birthDate, userRegisterData.status];
    let user = await connection.executeWithParameters(sql, parameters);
    return user.insertId
}

async function isUserMailExist(mail) {
    let sql = "SELECT id from supermarket.users where email = ?";
    let parameters = [mail];
    let users = await connection.executeWithParameters(sql, parameters);

    if (users && users.length > 0) {
        return true;
    }
    return false;
}

async function login(user) {
    let sql = `SELECT u.id, u.name, u.adress, u.status , c.date_start as cartDate, sum(p.unit_price*pc.count) as totalPrice
        FROM supermarket.users u
        left join supermarket.carts c
        on c.user_id = u.id
        left join supermarket.product_cart pc
        on pc.cart_id = c.id
         left join supermarket.product p
        on pc.product_id = p.id
        where email = ? and password = ?
        and c.date_end is null`;
    let parameters = [user.email, user.password];

    let userData = await connection.executeWithParameters(sql, parameters);
    if (!userData) {
        return false;
    }

    return userData;
}



module.exports = {
    addUser,
    login,
    isUserMailExist
}
