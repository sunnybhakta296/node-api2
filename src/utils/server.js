const express = require('express')
const deserializeUser = require("../middleware/deserializeUser")
const routes = require('../routes')

const createServer = () => {
    const app = express()
    app.use(express.json())

    app.use(deserializeUser)

    routes(app)
    return app

}

module.exports=createServer


// const connect = require('./connect')
// const app = require('../app')
// const UserRoutes = require('../routes/user.route')
// app.listen(3000, async () => {
//     console.log('Server started')
//     app.use("/user", UserRoutes)
//     await connect()
    
    
// })

// const express = require('express')
// // const routes = require('./routes')
// // const UserRoutes = require('./routes/user.route')
// const createServer = () => {
//     const app = express()
//     app.use(express.json())
//     // app.use("/user", UserRoutes)
//     // routes(app)

//     return app

// }

// module.exports=createServer