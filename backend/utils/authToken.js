import jwt from 'jsonwebtoken'

import ANO_CTO from '../models/ano_ctoSchema.js'
import Cadet from '../models/cadetSchema.js'
import Probationer from '../models/probationUser.js'

export const generateAccessToken = (user, role) => {
    const { name, mobileNumber, email, nccWing, permissions, accountApproved } = user;
    const payload = {
        "UserInfo": {
            name,
            mobileNumber,
            email, nccWing,
            permissions, accountApproved,
            role
        }
    }
    return jwt.sign(payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '10m'
        }
    )
}
export const generateRefreshToken = (user) => {
    const { name, mobileNumber, email, nccWing, permissions, accountApproved, role } = user;
    const payload = {
        name,
        mobileNumber,
        email, nccWing,
        permissions, accountApproved,
        role
    }
    return jwt.sign(payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1h'
        }
    )
    // console.log(payload)
}

export const refreshAccessToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const { role } = req.params;
    if (role === 'ANO_CTO') {
        let ano_cto = undefined
        try {
            ano_cto = await ANO_CTO.findOne({ refreshToken })
            if (!ano_cto) {
                return res.sendStatus(403)
            }
        } catch (err) {
            return res.sendStatus(403)
        }
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err || ano_cto.name !== decoded.name) return res.sendStatus(403) //invalid token
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            name: decoded.name,
                            mobileNumber: decoded.mobileNumber,
                            email: decoded.email, nccWing: decoded.nccWing,
                            permissions: decoded.permissions, accountApproved: decoded.accountApproved,
                            role: decoded.role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '10m'
                    }
                )
                return res.json({ accessToken })
            })
        } catch (err) {
            return res.sendStatus(403)
        }

    } else if (role === 'CADET') {
        let cadet = undefined
        try {
            cadet = await Cadet.findOne({ refreshToken })
            if (!cadet) {
                return res.sendStatus(403)
            }
        } catch (err) {
            return res.sendStatus(403)
        }
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err || cadet.name !== decoded.name) return res.sendStatus(403) //invalid token
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            name: decoded.name,
                            mobileNumber: decoded.mobileNumber,
                            email: decoded.email, nccWing: decoded.nccWing,
                            permissions: decoded.permissions, accountApproved: decoded.accountApproved,
                            role: decoded.role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '10m'
                    }
                )
                res.json({ accessToken })
            })
        } catch (err) {
            return res.sendStatus(403)
        }

    } else if (role === 'PROBATION') {
        let probationer = undefined
        try {
            probationer = await Probationer.findOne({ refreshToken })
            if (!probationer) {
                return res.sendStatus(403)
            }
        } catch (err) {
            return res.sendStatus(403)
        }
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err || probationer.name !== decoded.name) return res.sendStatus(403) //invalid token
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            name: decoded.name,
                            mobileNumber: decoded.mobileNumber,
                            email: decoded.email, nccWing: decoded.nccWing,
                            permissions: decoded.permissions, accountApproved: decoded.accountApproved,
                            role: decoded.role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '10m'
                    }
                )
                res.json({ accessToken })
            })
        } catch (err) {
            return res.sendStatus(403)
        }
    }
}

export const handleLogout = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    const { role } = req.params

    if (role === 'ANO_CTO') {
        let ano_cto = undefined
        try {
            ano_cto = await ANO_CTO.findOne({ refreshToken })
            if (!ano_cto) {
                res.clearCookie('jwt', {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true,
                })
                return res.sendStatus(204)
            }
        } catch (err) {
            return res.sendStatus(204)
        }
        try {
            ano_cto.refreshToken = ''
            await ano_cto.save()
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            })
            return res.sendStatus(204)
        } catch (err) {
            return res.sendStatus(204)
        }

    } else if (role === 'CADET') {
        let cadet = undefined
        try {
            cadet = await Cadet.findOne({ refreshToken })
            if (!cadet) {
                res.clearCookie('jwt', {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true,
                })
                return res.sendStatus(204)
            }
        } catch (err) {
            return res.sendStatus(204)
        }
        try {
            cadet.refreshToken = ''
            await cadet.save()
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            })
            return res.sendStatus(204)
        } catch (err) {
            return res.sendStatus(204)
        }

    } else if (role === 'PROBATION') {
        let probationer = undefined
        try {
            probationer = await Probationer.findOne({ refreshToken })
            if (!probationer) {
                res.clearCookie('jwt', {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true,
                })
                return res.sendStatus(204)
            }
        } catch (err) {
            return res.sendStatus(204)
        }
        try {
            probationer.refreshToken = ''
            await probationer.save()
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            })
            return res.sendStatus(204)
        } catch (err) {
            return res.sendStatus(204)
        }
    }
}