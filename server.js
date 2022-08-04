const mongoose =  require('mongoose')
var schema = new mongoose.Schema(
    {
        name:{type:String, uppercase:true, required: true},
        email:{type:String,  required: true},
        age:{type:Number},
        prograd_id:{type:Number},
        squad:{type:Number}
    },
    { collection: "list"}
)

module.exports = mongoose.model('User_Details', schema)