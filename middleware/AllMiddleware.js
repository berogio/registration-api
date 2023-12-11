const blockHTMLRequests = (req, res, next) => {
    const requestPath = req.path;
    if (requestPath.endsWith('.html')) {
        res.status(403).send('Access to HTML files is not allowed');
    } else {
        next();
    }
};

let requstTime = function(req, res, next) {
    req.requesTime = Date.now()
    next()
}

let guard = function() {
    return function middler(req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.status(401).redirect('/login');
        }
    };
};

module.exports = { blockHTMLRequests, requstTime, guard };