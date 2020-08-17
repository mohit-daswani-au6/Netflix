const mongoose = require("mongoose")
const Schema = mongoose.Schema
const reviewSchema = new Schema({
    userId:{type:String,required:true},
    name: { type: String, required:true},
    star:{type:Number},
    movie_id:{type:String }
})
const reviews = mongoose.model("review", reviewSchema)
module.exports = reviews