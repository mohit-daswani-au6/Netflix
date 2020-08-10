let mongoose = require("mongoose");

const Schema = mongoose.Schema;
let movieSchema = new Schema(
  {
    MovieName: { type: String,  unique: true },
    title: { type: String,  unique: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    posterImage:{type:String},
    video: { type: String, required: true },   
    isReleased: { type: Boolean, required: true, default: 0 },
    // country: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    trending:{type:Number},
    poplarity: { type: Number },
    runTime: { type: Number },
    isAdult: { type: Boolean, default: 0 },
    genre: [{ id: { type: Number }, name: { type: String } }],
  }
);
const movies = mongoose.model("movies", movieSchema);

module.exports = movies;
