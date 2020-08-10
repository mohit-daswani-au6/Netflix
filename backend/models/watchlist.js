let mongoose = require("mongoose");

const Schema = mongoose.Schema;
let watchlistSchema = new Schema(
  {
    title: { type: String, trim: true, required: true, unique: true },
    userId: { type: String, trim: true, required: true},
    description: { type: String, required: true },
    language: { type: String, required: true },
    video: { type: String, required: true },
    status: { type: String, required: true },
    poster: { type: String, required: true },
    country: { type: String, required: true },
    release_date: { type: Date, required: true },
    poplarity: { type: Number },
    runtime: { type: Number },
    adult: { type: Boolean, default: 0 },
    genre: [{ id: { type: Number }, name: { type: String } }],
  }
);
const watchlist = mongoose.model("watchlist", watchlistSchema);

module.exports = watchlist;
