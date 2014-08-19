module.exports = function illustrative (){
    return function(req, res, next) {
        res.locals.illustrative = {};
        res.locals.illustrative.type = 1;
        if (req.path.indexOf('/dashboard') === 0) {

        }else if (req.path.indexOf('/account') === 0) {
            res.locals.illustrative.type = 2;
        }else if (req.path.indexOf('/topic') === 0) {

        }else {

        }
        next();
    }
};