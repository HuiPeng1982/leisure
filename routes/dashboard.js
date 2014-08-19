exports.index = function(req, res){
    res.render('dashboard/index', {
        title: '首页',
        error: req.flash('error')
    });
};

exports.redirect = function(req, res){
    res.redirect('/dashboard');
};