const { createProduct, findProduct, findAndUpdateProduct, deleteProduct } = require("../service/product.service")

const createProductHandler = async(req, res) => {
    const userId = res.locals.user._id

    const body = req.body

    const product = await createProduct({...body, user: userId})

    return res.send(product)
}

const updateProductHandler = async(req, res) => {
    const userId = res.locals.user._id

    const productId= req.params.productId
    const update = req.body

    const product = await findProduct({productId})

    if (!product) {
        return res.sendStatus(404)
    }

    if (String(product.user) !=userId) {
        return res.sendStatus(403)
    }

    const updateProduct = await findAndUpdateProduct({productId}, update, {
        new: true
    })

    return res.send(updateProduct)
}

const getProductHandler = async(req, res) => {
    const productId= req.params.productId


    const product = await findProduct({productId})

    if (!product) {
        return res.sendStatus(404)
    }

    return res.send(product)
}

const deleteProductHandler = async(req, res) => {

    const userId = res.locals.user._id

    const productId= req.params.productId


    const product = await findProduct({productId})

    if (!product) {
        return res.sendStatus(404)
    }

    if (String(product.user) !=userId) {
        return res.sendStatus(403)
    }

    const updateProduct = await deleteProduct({productId})

    return res.sendStatus(200)

}

module.exports = {
    createProductHandler,
    updateProductHandler,
    getProductHandler,
    deleteProductHandler
}