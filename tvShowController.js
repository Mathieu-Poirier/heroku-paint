const pool = require("./database");

// Get all TV shows
const getTvShows = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tv_shows");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single TV show by ID
const getTvShowById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM tv_shows WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `TV show with ID ${id} does not exist` });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new TV show
const createTvShow = async (req, res) => {
  const { title, description, release_date, poster_url } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO tv_shows (title, description, release_date, poster_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, release_date, poster_url]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a TV show
const updateTvShow = async (req, res) => {
  const { id } = req.params;
  const { title, description, release_date, poster_url } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE tv_shows SET title = $1, description = $2, release_date = $3, poster_url = $4 WHERE id = $5 RETURNING *",
      [title, description, release_date, poster_url, id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `TV show with ID ${id} does not exist` });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a TV show
const deleteTvShow = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "DELETE FROM tv_shows WHERE id = $1 RETURNING *",
      [id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `TV show with ID ${id} does not exist` });
    }
    res.status(200).json({ message: `TV show with ID ${id} was deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTvShows,
  getTvShowById,
  createTvShow,
  updateTvShow,
  deleteTvShow,
};
