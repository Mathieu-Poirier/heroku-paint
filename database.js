const { Pool } = require("pg");

const pool = new Pool({
  host: "ec2-54-198-27-5.compute-1.amazonaws.com",
  port: "5432",
  database: "d16rtf8qmgp9p2",
  user: "udqbi70jhjed32",
  password: "pfb4e5bf2bcb1ff01ab5351551f9ca0526a749d3189add155078317bd2484149d",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
