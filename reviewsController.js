const pool = require("./database");

// Create a review
const createReview = async (req, res) => {
  const { user_id, tv_show_id, rating, comment } = req.body;
  try {
    const query =
      "INSERT INTO reviews (user_id, tv_show_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [user_id, tv_show_id, rating, comment];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const query = "SELECT * FROM reviews";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a review by ID
const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM reviews WHERE id = $1";
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Review with ID ${id} does not exist` });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const query =
      "UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *";
    const values = [rating, comment, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Review with ID ${id} does not exist` });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM reviews WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Review with ID ${id} does not exist` });
    }
    res.status(200).json({ message: `Review with ID ${id} was deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
