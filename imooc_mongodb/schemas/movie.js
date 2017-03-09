/**
 * Created by Administrator on 2016/9/13.
 */
var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAat = Date.now()
    }
    else{
        this.meta.updateAt = Date.now()
    }
    next()
});

//静态方法,只有实例化后才会调用
MovieSchema.statics = {
    //所有数据
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    //查询单笔数据
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

module.exports = MovieSchema;