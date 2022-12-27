const { get } = require("lodash")
const SessionModel = require("../models/session.model")
const { verifyJwt, singJwt } = require("../utils/jwt.utils")

const createSession = async (userId, userAgent) => {
    const session = await SessionModel.create({ user: userId, userAgent })
    return session.toJSON()
}

const findSession = async (query) => {
    return await SessionModel.find(query).lean()
}

const updateSession = async (query, update) => {
    return await SessionModel.updateOne(query, update)
}

const reIssueActionToken = async (refreshToken) => {
    const { decoded } = verifyJwt(refreshToken)

    if (!decoded || !get(decoded, "session")) return false

    const session = await SessionModel.findById(get(decoded, "session"))

    if (!session || !session.isValid) return false

    const user = await findUser({_id: session.user})

    if (!user) return false

    const accessTokenTtl = "15m"
    const accessToken = singJwt(
        {...user, session: session._id},
        {expiresIn: accessTokenTtl} //15m
    )

    return accessToken


}
module.exports = {
    createSession,
    findSession,
    updateSession,
    reIssueActionToken
}