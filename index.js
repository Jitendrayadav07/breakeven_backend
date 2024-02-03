const express = require("express");
const app = express();
const sequelize = require("./config/db");
const cors = require("cors");

// Import routes
const routes = require("./routes");

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Sync models with the database
sequelize.sync();
// Middleware to parse request bodies as JSON or Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use routes
app.use("/v1", routes);

const PORT = 3000
// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
