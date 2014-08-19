var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    content_html: {type: String, default: ''},
    content_text: {type: String, default: ''},
    tags: [{type : String}],
    user: {type : Schema.ObjectId, ref : 'User'},
    is_delete: {type : Boolean, default: false},
    created_at: {type: Date, default: Date.now}
});

BlogSchema.statics = {
    load: function (id, cb) {
        this.findById(id)
            .populate('user', '_id name email nick_name avatar')
            .exec(cb);
    },

    list: function (options, cb) {
        var criteria = options.criteria || {};
        this.find(criteria)
            .populate('user', '_id name email nick_name avatar')
            .sort({'created_at': -1})
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    }
};

//BlogSchema..methods = {
//
//};

mongoose.model('Blog', BlogSchema);