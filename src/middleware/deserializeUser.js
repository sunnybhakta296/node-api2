const { get } = require('lodash');
const { reIssueActionToken } = require('../service/session.service');
const { verifyJwt } = require('../utils/jwt.utils');

const deserializeUser = async(req, res, next) => {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );

    const refreshToken = get(req, "headers.x-refresh")

    if (!accessToken) {
        return next()
    }

    // console.log('Access token', accessToken)
    const { decoded, expired } = verifyJwt(accessToken)
    
    if (decoded) {
        res.locals.user = decoded
        return next()
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueActionToken(refreshToken)

        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }

        const result = verifyJwt(newAccessToken)
        res.locals.user= result.decoded
        return next()
    }

    next()

}

module.exports=deserializeUser