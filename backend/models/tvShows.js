let mongoose = require("mongoose");

const Schema = mongoose.Schema;
let tvShowSchema = new Schema({
  name: { type: String, trim: true,  unique: true },
  episodes: [
    {
      title: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      img_url:{type:String},
      video_url: { type: String, required: true },
      runtime: { type: Number },
      season: { type: Number },
      episode: { type: Number },  
      links:{previous:{type:String},next:{type:String}}
    },
  ],
  trending:{type:Number},
  poplarity: { type: Number },
  released: { type: Boolean, required: true, default: 0 },
  description: { type: String, required: true },
  language: { type: String, required: true },
  image_url: { type: String, required: true },
  country: { type: String, required: true },
  release_date: { type: Date, required: true },
  isAdult: { type: Boolean, default: 0 },
  genre: [{ id: { type: Number }, name: { type: String } }],
});
const tvshows = mongoose.model("tvshows", tvShowSchema);

module.exports = tvshows;
