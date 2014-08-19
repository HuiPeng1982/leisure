exports.requiresLogin = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    if (req.method == 'GET') {
        req.session.returnTo = req.originalUrl;
    }
    res.redirect('/account/login');
};

exports.hasPurchaseAuthorization = function (req, res, next) {
    if (req.purchase.user._id.toString() != req.user._id.toString()) {
        req.flash('error', '你并不是当前用户，请重新登录！');
        return res.redirect('/account/logout');
    }
    next();
};

exports.hasShoppingAuthorization = function (req, res, next) {
    if (req.item.user._id.toString() === req.user._id.toString() || req.purchase.user._id.toString() === req.user._id.toString()) {
        next();
    } else {
        req.flash('error', '你并不是当前用户，请重新登录！');
        return res.redirect('/account/logout');
    }
};
