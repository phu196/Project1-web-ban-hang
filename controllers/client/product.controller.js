const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        delete: false
    })

    const newProducts = products.map(item => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(2);
        return item
    })

    console.log(newProducts)

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
    })
    }

module.exports.detail = async (req, res) => {
    try {
        console.log(req.params.slug)

        const find = {
            delete: false,
            slug: req.params.slug
        }

        const product = await Product.findOne(find)

        console.log(product)

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        res.redirect(`/products`)
    }
}