const homeRoute = require("./home.route")
const productRoute = require("./product.route")
const cartRoute = require("./cart.route");
const orderRoute = require("./order.route");
const userRoute = require("./user.route");

const cartMiddleware = require("../../middlewares/client/cart.middleware");

const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) => {
    app.use(cartMiddleware.cart);

    app.use(userMiddleware.infoUser);

    app.use('/', homeRoute)
    app.use('/products', productRoute)
    app.use("/cart", cartRoute);
    app.use("/order", orderRoute);
    app.use("/user", userRoute);
}