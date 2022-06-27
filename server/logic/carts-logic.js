const cartsDal = require('../dal/carts-dal');



async function getMyCart(id) {
    let myCart = await cartsDal.getMyCart(id);
    return myCart;
}

async function chackCartOpen(userId) {
    let cartId = await cartsDal.chackCartOpen(userId);
    return cartId;
}

async function openCart(userId) {
    let user = {
        id: userId,
        date: new Date
    }
    await cartsDal.openCart(user);
    return ;
}

async function cleanCart(userId) {
    let cartId = await cartsDal.chackCartOpen(userId);
    let cart = {
        id: cartId,
        date: new Date
    }
    await cartsDal.cleanCart(cart);
    await cartsDal.updateDate(cart);
    return ;
}

async function creatingCartFollowingPayment(userId) {

    let cartId = await cartsDal.chackCartOpen(userId);

    let cart = {
        cartId: cartId,
        id: userId,
        date: new Date
    }
    await cartsDal.closeCart(cart);
    await cartsDal.openCart(cart);
    return ;
}



module.exports = {
    getMyCart,
    chackCartOpen,
    openCart,
    cleanCart,
    creatingCartFollowingPayment
}