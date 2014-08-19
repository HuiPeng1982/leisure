var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicSchema = new Schema({
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    pic: {type: String, default: ''},
    tags: [{type : String}],
    user: {type : Schema.ObjectId, ref : 'User'},
    is_delete: {type : Boolean, default: false},
    created_at: {type: Date, default: Date.now}
});

TopicSchema.statics = {
    load: function (id, cb) {
        this.findById(id)
            .populate('user', '_id name email nick_name avatar')
            .exec(cb);
    },

    list: function (options, cb) {
        var criteria = options.criteria || {};
        this.find(criteria)
            .populate('user', '_id name email nick_name avatar')
            .sort({'createdAt': -1})
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    }
};

TopicSchema.pre('save', function(next) {
    if(this.pic === ''){
        this.pic = '/images/' + Math.floor((Math.random() * 8) + 1) + '.png';
    }
    next();
});

mongoose.model('Topic', TopicSchema);