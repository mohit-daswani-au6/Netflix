const movieSchema = require("../models//movies");
const watchListSchema = require("../models/watchlist");
module.exports = {
  get1: {
    async getUserWatchlist(req, res) {
      try {
        const user = req.user;
        const watchlist = await watchListSchema.find({ userId: user.id });
        const movies = [];
        watchlist.map(async (list) => {
          const movie = await movieSchema.find({ _id: list.movieId });
          movies.push(movie[0]);
        });
        setTimeout(() => {
          res.json({ statusCode: 201, movies });
        }, 5000);
      } catch (err) {
        console.log(err);
        res.send("serverError");
      }
    },
  },
  post1: {
    async addToWatchlist(req, res) {
      try {
        const { movieId } = req.params;
        const user = req.user;
        const watchlist = await watchListSchema.create({
          userId: user.id,
          movieId,
        });
        console.log(watchlist);
        res.send(watchlist);
      } catch (err) {
        console.log(err);
        res.send("serverError");
      }
    },
  },
};
