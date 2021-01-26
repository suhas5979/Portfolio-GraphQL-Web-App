const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
   text:String,
   userId:String,
   date : {
       type:String,
       default: new Date()
   },
   likes:{
       type: Number,
       default:0
   } ,
   likedMembers:{
       type:[String],
       default:[]
   }
});

mongoose.model('comment',commentSchema);