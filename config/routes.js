var env = process.env.NODE_ENV || 'development',
    auth = require('../lib/auth');

module.exports = function (app, passport) {

    app.post('/account/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return done(err); }
            if (!user) {
                req.flash('error', info.message);
                return res.redirect('/account/login');
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                var url = '/';
                if (req.session && req.session.returnTo) {
                    url = req.session.returnTo;
                    delete req.session.returnTo;
                }
                return res.redirect(url);
            });
        })(req, res, next);
    });


//    GET     /forums              ->  index
//    GET     /forums/new          ->  new
//    POST    /forums              ->  create
//    GET     /forums/:forum       ->  show
//    GET     /forums/:forum/edit  ->  edit
//    PUT     /forums/:forum       ->  update
//    DELETE  /forums/:forum       ->  destroy

    var dashboard = require('../routes/dashboard');
    app.get('/', dashboard.redirect);
    app.get('/dashboard', dashboard.index);

    var account = require('../routes/account');
    app.get('/account/login', account.login);
    app.get('/account/register', account.register);
    app.get('/account/logout', account.logout);
    app.post('/account/register', account.signup);

    var topic = require('../routes/topic');
    app.param('topic', topic.load);
    app.get('/topic', topic.index);
    app.get('/topic/following', topic.indexFollowing);
    app.get('/topic/mine', topic.indexMine);
    app.get('/topic/new', topic.new);
    app.post('/topic', topic.create);
    app.get('/topic/:topic', topic.show);
    app.get('/topic/:topic/edit', topic.edit);
    app.put('/topic/:topic', topic.update);
    app.delete('/topic/:topic', topic.destroy);


    var blog = require('../routes/blog');
    app.param('blog', blog.load);
    app.param('blogTag', blog.tag);
    app.param('blogTopic', blog.topic);
    app.get('/blog', blog.index);
    app.get('/blog/tag/:blogTag', blog.index);
    app.get('/blog/topic/:blogTopic', blog.index);
    app.get('/blog/following', [auth.requiresLogin] , blog.indexFollowing);
    app.get('/blog/following/tag/:blogTag', [auth.requiresLogin] , blog.indexFollowing);
    app.get('/blog/following/topic/:blogTopic', [auth.requiresLogin] , blog.indexFollowing);
    app.get('/blog/mine', [auth.requiresLogin] ,blog.indexMine);
    app.get('/blog/mine/tag/:blogTag', [auth.requiresLogin] ,blog.indexMine);
    app.get('/blog/mine/topic/:blogTopic', [auth.requiresLogin] ,blog.indexMine);
    app.get('/blog/new', [auth.requiresLogin] ,blog.new);
    app.post('/blog', [auth.requiresLogin] ,blog.create);
    app.get('/blog/:blog', blog.show);
    app.get('/blog/:blog/edit', [auth.requiresLogin] ,blog.edit);
    app.put('/blog/:blog', [auth.requiresLogin] ,blog.update);
    app.delete('/blog/:blog', blog.destroy);

    app.post('/blog/imagesUpload', blog.imagesUpload);
    app.post('/blog/imagesDelete', blog.imagesDelete);


    /// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /// error handlers

    // development error handler
    // will print stacktrace
    if (env === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};