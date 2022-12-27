const { omit } = require("lodash")
const UserModel = require("../models/user.model")

const createUser = async (input) => {
    try {
        const user = await UserModel.create(input)
        return user
    } catch (e) {
        throw new Error(e)
    }
}


const validatePassword = async ({email, password}) => {
    const user = await UserModel.findOne({ email })

    if (!user) {
        return false
    }

    const isValid = await user.comparePassword(password)

    if (!isValid) {
        return false
    }

    return omit(user.toJSON(), "password")
}

const getUsers = async () => {
    try {
        const users = await UserModel.find({})
        return users
    } catch (e) {
        throw new Error(e)
    }
}

const findUser = async (query) => {
    return UserModel.findOne(query).lean()
}

module.exports = {
    createUser,
    validatePassword,
    getUsers
}