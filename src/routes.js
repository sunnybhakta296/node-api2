const { createProductHandler, updateProductHandler, getProductHandler, deleteProductHandler } = require("./controllers/product.controller")
const { createUseSessionHandler, getUserSessionsHandler, deleteSessionHandler } = require("./controllers/session.controller")
const { createUserHandler } = require("./controllers/user.controller")
const requireUser = require("./middleware/requireUser")


const routes=(app)=>{
    app.get("/healthcheck", (req, res)=> {
        return res.sendStatus(200)
    })

    app.post("/api/users",createUserHandler)

    app.post("/api/sessions", createUseSessionHandler)

    app.get("/api/sessions",requireUser, getUserSessionsHandler)

    app.delete("/api/sessions",requireUser, deleteSessionHandler)

    app.post("/api/products", requireUser, createProductHandler)

    app.put("/api/products/:productId", requireUser, updateProductHandler)

    app.get("/api/products/:productId", getProductHandler)

    app.delete("/api/products/:productId", requireUser, deleteProductHandler)

    // app.get("/user", getUsersHandler)
}

module.exports=routes