CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tv_shows (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  release_date DATE,
  poster_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  tv_show_id INT NOT NULL,
  season INT,
  episode_number INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tv_show_id) REFERENCES tv_shows(id) ON DELETE CASCADE
);

CREATE TABLE watchlist (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  tv_show_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tv_show_id) REFERENCES tv_shows(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  tv_show_id INT NOT NULL,
  rating INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tv_show_id) REFERENCES tv_shows(id) ON DELETE CASCADE
);