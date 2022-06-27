const productCartsDal = require('../dal/product-cart-dal');
const cartsLogic = require('../logic/carts-logic');


async function addToMyCarts(productData) {
    if (!productData.cartId) {
        let cartId = await cartsLogic.chackCartOpen(productData.userId)
        productData.cartId = cartId
    }

    if (await productCartsDal.ProductAlreadyInCart(productData)) {
        this.ChangeAmount(productData);
    }
    else {
        await productCartsDal.addToMyCarts(productData);
    }
    return;
}

async function ChangeAmount(productData) {
    if (!productData.cartId) {
        let cartId = await cartsLogic.chackCartOpen(productData.userId)
        productData.cartId = cartId
    }

    if (productData.amount != 0) {
        await productCartsDal.ChangeAmount(productData)
    }
    else {
        deleteFromMyCart(productData);
    }
    return;
}

async function deleteFromMyCart(productData) {
    if (!productData.cartId) {
        let cartId = await cartsLogic.chackCartOpen(productData.userId)
        productData.cartId = cartId
    }
    await productCartsDal.deleteFromMyCart(productData);
    return;
}



module.exports = {
    addToMyCarts,
    ChangeAmount,
    deleteFromMyCart
}