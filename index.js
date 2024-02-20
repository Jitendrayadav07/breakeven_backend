const express = require("express");
const app = express();
const cors = require("cors");

// Import routes
const routes = require("./routes");

// Sync models with the database
const sequelizeDB = require("./config/db.config");
sequelizeDB.sequelize.sync(sequelizeDB);

// Middleware to parse request bodies as JSON or Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use routes
app.use("/v1", routes);

const PORT = 5000
// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
