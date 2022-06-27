const productsDal = require('../dal/product-dal');


async function getAllProducts() {
    let Products = await productsDal.getAllProducts();
    return Products;
}

async function addProduct(product) {
    await productsDal.addProduct(product);
    //Maybe we'll use a socket here
    return ;
}

async function updateProduct(product) {
    await productsDal.updateProduct(product);
        //Maybe we'll use a socket here
    return ;
}

async function getPramsToLoginPage() {
    let params = await productsDal.getPramsToLoginPage();
    return params;
}


module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    getPramsToLoginPage
}