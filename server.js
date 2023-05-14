const pool = require("./database");
const cors = require("cors");

// Importing express and postgresql
const express = require("express");
const app = express();
const PORT = 3000;
app.use(cors());

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

// Importing controller files
const userController = require("./userController.js");
const tvShowController = require("./tvShowController.js");
const episodeController = require("./episodeController.js");
const watchlistController = require("./watchlistController.js");
const reviewsController = require("./reviewsController.js");

// Register the routes

app.use(express.json());
// Users
app.post("/users", userController.createUser);
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

// Tv-Shows
app.post("/tv-shows", tvShowController.createTvShow);
app.get("/tv-shows", tvShowController.getTvShows);
app.get("/tv-shows/:id", tvShowController.getTvShowById);
app.put("/tv-shows/:id", tvShowController.updateTvShow);
app.delete("/tv-shows/:id", tvShowController.deleteTvShow);

// Episodes
app.post("/episodes", episodeController.createEpisode);
app.get("/episodes", episodeController.getAllEpisodes);
app.get("/episodes/:id", episodeController.getEpisodeById);
app.put("/episodes/:id", episodeController.updateEpisode);
app.delete("/episodes/:id", episodeController.deleteEpisode);

// Watchlists
app.post("/watchlist", watchlistController.createWatchlist);
app.get("/watchlist", watchlistController.getWatchlists);
app.get("/watchlist/:id", watchlistController.getWatchlistById);
app.put("/watchlist/:id", watchlistController.updateWatchlist);
app.delete("/watchlist/:id", watchlistController.deleteWatchlist);

// Reviews
app.post("/reviews", reviewsController.createReview);
app.get("/reviews", reviewsController.getAllReviews);
app.get("/reviews/:id", reviewsController.getReviewById);
app.put("/reviews/:id", reviewsController.updateReview);
app.delete("/reviews/:id", reviewsController.deleteReview);

module.exports = pool;

// Server listening on a certain PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
