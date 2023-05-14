// watchlistController.js
const pool = require("./database");

// Create a new watchlist entry
const createWatchlist = async (req, res) => {
  try {
    const { user_id, tv_show_id } = req.body;
    const query =
      "INSERT INTO watchlist (user_id, tv_show_id) VALUES ($1, $2) RETURNING *";
    const values = [user_id, tv_show_id];
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all watchlist entries
const getWatchlists = async (req, res) => {
  try {
    const query = "SELECT * FROM watchlist";
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific watchlist entry by ID
const getWatchlistById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM watchlist WHERE id = $1";
    const values = [id];
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Watchlist entry with ID ${id} does not exist` });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a watchlist entry
const updateWatchlist = async (req, res) => {
  const { id } = req.params;
  const { user_id, tv_show_id } = req.body;
  try {
    const query =
      "UPDATE watchlist SET user_id = $1, tv_show_id = $2 WHERE id = $3 RETURNING *";
    const values = [user_id, tv_show_id, id];
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Watchlist entry with ID ${id} does not exist` });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a watchlist entry
const deleteWatchlist = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM watchlist WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Watchlist entry with ID ${id} does not exist` });
    }
    res
      .status(200)
      .json({ message: `Watchlist entry with ID ${id} was deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWatchlist,
  getWatchlists,
  getWatchlistById,
  updateWatchlist,
  deleteWatchlist,
};
