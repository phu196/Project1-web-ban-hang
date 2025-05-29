const Product = require("../../models/product.model")

const systemConfig = require("../../config/systems")

const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // console.log(req.query.status)

    const filterStatus = filterStatusHelper(req.query)
    // console.log(filterStatus)

    let find = {
        delete: false,
    }
    if (req.query.status) {
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query);
    // console.log(objectSearch)

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    // Pagination
    const countProducts = await Product.countDocuments(find)

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        countProducts
    )

    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)

    // console.log(products)

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({ _id: id }, { status: status })

    res.redirect('back')
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id

    // await Product.deleteOne({_id: id})
    await Product.updateOne({ _id: id }, {
        delete: true,
        deleteAt: new Date()
    })
    res.redirect('back')
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
    })
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    // console.log(req.file)
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if (req.body.position == "") {
        const countProducts = await Product.estimatedDocumentCount();
        req.body.position = countProducts + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    const product = new Product(req.body)
    await product.save()

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        // console.log(req.params.id)

        const find = {
            delete: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find)

        // console.log(product)

        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    req.body.price = parseFloat(req.body.price)
    req.body.discountPercentage = parseFloat(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        await Product.updateOne({ _id: id }, req.body)
    } catch (error) {

    }

    res.redirect(`back`);
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        // console.log(req.params.id)

        const find = {
            delete: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find)

        console.log(product)

        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}