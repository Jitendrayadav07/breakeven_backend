// config/db.config.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect,
//   }
// );

const sequelize = new Sequelize(
  process.env.BREAKEVEN_DB,
  process.env.BREAKEVEN_USERNAME,
  process.env.BREAKEVEN_PASSWORD,
  {
    host: process.env.BREAKEVEN_HOST,
    dialect: "mysql",
    port: 3306,
  }
);


// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
.catch((err) => {
    console.error("Unable to connect to the database:", err);
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("../models/user")(sequelize, Sequelize);
db.group = require("../models/group")(sequelize, Sequelize);
db.group_member = require("../models/group_member")(sequelize, Sequelize);
db.expenses = require("../models/expense")(sequelize, Sequelize);
db.category = require("../models/category")(sequelize, Sequelize);
db.currency = require("../models/currency")(sequelize, Sequelize);
db.access_contact = require("../models/access_contact")(sequelize, Sequelize);
db.group_type = require("../models/group_type")(sequelize, Sequelize);
db.group_icon = require("../models/group_icon")(sequelize, Sequelize);

// db.group.belongsTo(db.group_type, { foreignKey: 'type_id' });
// db.group_type.hasMany(db.group, { foreignKey: 'type_id' });

module.exports = db;
