var mongoose = require('mongoose'),
    Topic = mongoose.model('Topic');

exports.load = function(req, res, next, id){
    Topic.load(id, function (err, topic) {
        if (err) return next(err);
        if (!topic) return next(new Error('不存在此专题！'));
        req.topic = topic;
        next();
    })
};

var list = function(req, res, criteria, title){
    var criteria = criteria || {};
    criteria.is_delete = false;
    var title = title || '专题';
    var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
    var perPage = 30;
    var options = {
        perPage: perPage,
        page: page,
        criteria: criteria
    };
    Topic.list(options, function (err, topics) {
        if (err) return next(err);
        res.render('topic/index', {
            title: title,
            topics: topics,
            error: req.flash('error')
        });
    })
};

exports.index = function(req, res){list(req, res, null, '全部专题');};

exports.indexFollowing = function(req, res){list(req, res, null, '我关注的专题');};

exports.indexMine = function(req, res){list(req, res, {user: req.user._id}, '我的专题');};

exports.new = function(req, res){
    res.render('topic/new', {
        title: '新专题',
        topic: new Topic(),
        error: req.flash('error')
    });
};

exports.create = function(req, res){
    var topic = new Topic(req.body);
    topic.tags = topic.tags.join().split(/\s*,\s*/);
    if(req.files.pic != undefined) {
        topic.pic = '/uploads/' + req.files.pic.name;
    }
    topic.user = req.user;
    topic.save(function(err){
        if (err) return next(err);
        res.redirect('/topic/mine');
    });
};

exports.show = function(req, res){

};

exports.edit = function(req, res){

};

exports.update = function(req, res){

};

exports.destroy = function(req, res){

};