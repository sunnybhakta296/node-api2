const express = require('express')
const { getUsersHandler, createUserHandler } = require('../controllers/user.controller')
const router = express.Router()


router.get("/", getUsersHandler)
router.post("/create", createUserHandler)
router.post("/cl", (req, res)=> {
    res.send({h:123})
})

module.exports = router
