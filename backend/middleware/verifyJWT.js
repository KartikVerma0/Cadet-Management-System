import jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403) //invalid token
        req.user = decoded.UserInfo.name
        req.role = decoded.UserInfo.role
        req.email = decoded.UserInfo.email
        req.permissions = decoded.UserInfo.permissions
        next()
    })
}