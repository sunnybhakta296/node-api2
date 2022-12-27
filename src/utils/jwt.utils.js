const jwt = require('jsonwebtoken')

// const config = {
//     port: 1337,
//     dbUri: "mongodb://localhost:27017/rest-api-tutorial",
//     saltWorkFactor: 10,
//     accessTokenTtl: "15m",
//     refreshTokenTtl: "1y",
//     publicKey: `-----BEGIN PUBLIC KEY-----
//     MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTBEXucmSBLvQAUM4IeWIbBFG5
//     RmGYGKzkCx1CTI2q4aU+U6PqNvTAni8AtQdrpGOcKy5A6wNZYgE7DiMkcOCF+jR5
//     x5BK98W+JQyOUG7A+tzrzy7QndMbMUEkraoBUvCp+qHLYuIvbzdOxNHknA1HFcVA
//     2RoPJ+H+Q9xFVcxUKQIDAQAB
//     -----END PUBLIC KEY---`--`,
//     privateKey: `-----BEGIN RSA PRIVATE KEY-----
//     MIICXAIBAAKBgQCTBEXucmSBLvQAUM4IeWIbBFG5RmGYGKzkCx1CTI2q4aU+U6Pq
//     NvTAni8AtQdrpGOcKy5A6wNZYgE7DiMkcOCF+jR5x5BK98W+JQyOUG7A+tzrzy7Q
//     ndMbMUEkraoBUvCp+qHLYuIvbzdOxNHknA1HFcVA2RoPJ+H+Q9xFVcxUKQIDAQAB
//     AoGAc38h6UfZCVv3uN/CXQnvNsZX5bQTK8gG20iX/ePiT+LhTGutFG2ELmaXCnkt
//     kTUeRCvwNHPst6W0zc43cYNz/tpOMpnfHVpVPD2tr6vVYhk0u0VIACQtQfUWy7+y
//     zX9woCRH3TrQqkU1dt0ze4WPMRW+IgA4cOilORhmVHjCnOECQQDZuG6I06zJYlBE
//     X0NVkX+y1L5TZNk3nLJ70mVrJY25ix+ZaDf4uyHd/0UBHg7p3u3sismTW/zdDEGn
//     qgx9AebNAkEArN15o1ihWzH2cLPowEQuL2KuA/jMNaqtyoVi7t8y3BBJ8fdjVHHA
//     FKp9DBOTilSAfyRzPkCJeyoOmqC4cEyKzQJBALGBpNz5d45ZEYgtAwDot2xd9y6W
//     smKc5wf86aMJ4xq7SvAQAFJSf7I3RVM75nzWvLR2ExKJlQfDzmOcSMJCoqECQEQW
//     E7Pv09YMjsmDQxh/gkVts6ai1yQILt2Gvhnh1bFxxP5F91yqVQKOyCP6jfE9KUNq
//     wu1xE/Vr8kabKSoqK70CQBnTP9ISAPZyzJm84WJ5z01mHMJTwfOtY9pN/LyXY8hI
//     fQ/Cakho0o5xrJFM4IhDwqfdqVLYl3DGms7yzQnouwQ=
//     -----END RSA PRIVATE KEY-----`,
// };

const fs = require("fs")
const privateKey = fs.readFileSync(`E:/sunny/node/demo2/src/utils/private.key`, 'utf-8')
const publicKey = fs.readFileSync(`E:/sunny/node/demo2/src/utils/public.key`, 'utf-8')

const singJwt = (object, options) => {
    // console.log(object)
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256",
    });

}

const verifyJwt = (token) => {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (e) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}

module.exports = {
    singJwt,
    verifyJwt
}