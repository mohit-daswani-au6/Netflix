const { get, post, put, delete1 } = require("../controllers/moviesController");
const{post1,get1}=require("../controllers/watchListController")
const { Router } = require("express");
const authentication=require("../middlewares/authentication")
const router = Router();
router.get("/allMovies",authentication, get.getAllMovies);
router.get("/movies/netflixOriginals",authentication, get.fetchNetflixOriginalMovies);
router.get("/movies/topRated", get.fetchTopRatedMovies);
router.get("/movies/TrendingMovies", get.fetchTrendingMovies);
router.get("/movies/:genres", get.getMovieByGenre);
router.get("/user/watchlist",authentication, get1.getUserWatchlist);
router.get("/movie/:movieId",authentication, get.singleMovie)
router.post("/watchList/:movieId",authentication, post1.addToWatchlist)
router.get("/searchMovies",authentication, get.search_movie)
router.get("/movies/language/:language",authentication, get.getMovieByLanguage)
module.exports = router;