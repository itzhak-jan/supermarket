const express = require('express');
const cors = require('cors');

const server = express();

const usersController = require('./controllers/users-controller');
const productController = require('./controllers/product-controller');
const cartsController = require('./controllers/carts-controler');
const productCartsController = require('./controllers/product-cart-controller');
const categoriesController = require('./controllers/categories-controller');
const ordersController = require('./controllers/orders-controller');

const loginFilter = require('./middleware/login-filter');

server.use(cors({origin: "http://localhost:4200"}));
server.use(loginFilter());

server.use(express.json());

server.use("/users", usersController);
server.use("/products", productController);
server.use("/carts", cartsController);
server.use("/productCart", productCartsController);
server.use("/categories", categoriesController);
server.use("/orders", ordersController);



// The following line launches the node server, on port 3001
server.listen(3001, () => console.log("Listening on http://localhost:3001"));