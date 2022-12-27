const ProductModel = require("../models/product.model")

const createProduct = async (input) =>{
    return ProductModel.create(input)
}

const findProduct = async (query, options) =>{
    return ProductModel.findOne(query, {}, options)
}

const findAndUpdateProduct = async (query, update, options) =>{
    return ProductModel.findOneAndUpdate(query, update, options)
}

const deleteProduct = async (query) =>{
    return ProductModel.deleteOne(query)
}

module.exports = {
    createProduct,
    findProduct,
    findAndUpdateProduct,
    deleteProduct
}