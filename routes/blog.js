var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog');

exports.load = function(req, res, next, id){
    Blog.load(id, function (err, blog) {
        if (err) return next(err);
        if (!blog) return next(new Error('不存在此日记！'));
        req.blog = blog;
        next();
    })
};

exports.tag = function(req, res, next, tag){
    req.tag = tag;
    next();
};

exports.search = function(req, res, next, search){
    req.search = search;
    next();
};

exports.topic = function(req, res, next, topic){
    req.topic = topic;
    next();
};

var list = function(req, res, criteria, title){
    var criteria = criteria || {};
    if(req.tag){
        criteria.tags = req.tag;
    }
    if(req.search){
        criteria.content_text = new RegExp(req.search);
    }
    criteria.is_delete = false;
    var title = title || '日记';
    var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
    var perPage = 30;
    var options = {
        perPage: perPage,
        page: page,
        criteria: criteria
    };
    Blog.list(options, function (err, blogs) {
        if (err) return next(err);
        res.render('blog/list', {
            title: title,
            blogs: blogs,
            error: req.flash('error')
        });
    })
};

exports.index = function(req, res){list(req, res, null, '全部日记');};

exports.indexFollowing = function(req, res){list(req, res, null, '我关注的日记');};

exports.indexMine = function(req, res){list(req, res, {user: req.user._id}, '我的日记');};

exports.new = function(req, res){
    res.render('blog/new', {
        title: '新日记',
        blog: new Blog(),
        error: req.flash('error')
    });
};

exports.create = function(req, res){
    var blog = new Blog(req.body);
    blog.tags = blog.tags.join().split(/\s*,\s*/);
    blog.user = req.user;
    blog.save(function(err){
        if (err) return next(err);
        res.redirect('/blog/mine');
    });
};

exports.show = function(req, res){
    res.render('blog/show', {
        title: '日记 - ' + req.blog.title ,
        blog: req.blog,
        error: req.flash('error')
    });
};

exports.edit = function(req, res){
    res.render('blog/edit', {
        title: '日记 - ' + req.blog.title ,
        blog: req.blog,
        error: req.flash('error')
    });
};

exports.update = function(req, res, next){
    var blog = new Blog(req.body);
    var update = {};
    update.title = blog.title;
    update.description = blog.description;
    update.content_html = blog.content_html;
    update.content_text = blog.content_text;
    update.tags = blog.tags.join().split(/\s*,\s*/);
    update.is_delete = blog.is_delete;
    Blog.findByIdAndUpdate(req.blog._id, update, function(err){
        if (err) return next(err);
        res.redirect('/blog/mine');
    });
};

exports.destroy = function(req, res){

};

exports.imagesUpload = function(req, res){
    var imageName = '/uploads/'  + req.files.file.name;
    console.log('Upload: ' + imageName);
    res.json({link : imageName});
};

exports.imagesDelete = function(req, res){
    console.log('Delete: ' + req.body.file);
    res.status(200).end();
};