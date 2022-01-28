const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "alliswell",
  database: "automation",
});

module.exports = client;
