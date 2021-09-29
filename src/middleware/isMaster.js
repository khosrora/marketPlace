// find master
exports.isMaster = (req, res, next) => {
    if (req.user.role === "master") {
        isMaster = true;
        next();
    } else {
        isMaster = false;
        next();
    }
}