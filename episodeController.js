const pool = require("./database");

// Create an episode
const createEpisode = async (req, res) => {
  const { tv_show_id, season, episode_number, title, description, duration } =
    req.body;

  try {
    const { rows } = await pool.query(
      "INSERT INTO episodes (tv_show_id, season, episode_number, title, description, duration) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [tv_show_id, season, episode_number, title, description, duration]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all episodes
const getAllEpisodes = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM episodes");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an episode by ID
const getEpisodeById = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query("SELECT * FROM episodes WHERE id = $1", [
      id,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Episode with ID ${id} does not exist` });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an episode
const updateEpisode = async (req, res) => {
  const { id } = req.params;
  const { tv_show_id, season, episode_number, title, description, duration } =
    req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE episodes SET tv_show_id = $1, season = $2, episode_number = $3, title = $4, description = $5, duration = $6 WHERE id = $7 RETURNING *",
      [tv_show_id, season, episode_number, title, description, duration, id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Episode with ID ${id} does not exist` });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an episode
const deleteEpisode = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      "DELETE FROM episodes WHERE id = $1 RETURNING *",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Episode with ID ${id} does not exist` });
    }

    res.status(200).json({ message: `Episode with ID ${id} was deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEpisode,
  getAllEpisodes,
  getEpisodeById,
  updateEpisode,
  deleteEpisode,
};
