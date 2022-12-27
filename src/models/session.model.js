const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { use } = require('../app')

const sessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
        valid: { type: Boolean, default: true },
        userAgent: { type: String }
    }, {
    timestamps: true
})

const SessionModel = mongoose.model("Session", sessionSchema)
module.exports = SessionModel