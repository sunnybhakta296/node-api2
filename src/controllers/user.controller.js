//const { createUser, getUsers } = require("../service/user.service")
const UserService = require("../service/user.service")

const getUsersHandler = async(req, res) => {
    // return res.status(200).json({users: "Hi im user"})++
    try {
        const users = await UserService.getUsers();

        return res.send(users)
    } catch(e) {
        return res.send(400)
    }
}

const createUserHandler = async(req, res)=> {
    try {
        const user = await UserService.createUser(req.body)

        return res.send(user)
    } catch(e) {
        console.log('Error in creatng user', e)
        return res.status(409).send("pagal")
    }
}

module.exports = {
    getUsersHandler,
    createUserHandler
}