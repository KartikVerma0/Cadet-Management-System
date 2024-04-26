const verifyPermissions = (...allowedPermissions) => {
    return (req, res, next) => {
        if (!req?.permissions) return res.json({ status: false, message: "Unauthorized action" }).status(401)
        const permissionsArray = [...allowedPermissions]
        const result = req.permissions.map(permission => permissionsArray.includes(permission)).find(val => val === true)

        if (!result) return res.json({ status: false, message: "Unauthorized action" }).status(401)
        next()
    }
}
export default verifyPermissions