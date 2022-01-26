// the magic of Sequelize starts with importing the Sequelize class
const Sequelize = require('sequelize');
require('dotenv').config();

/* to run our database, we define a sequelize object, passing it our database URL:
(env variable for when the app is on Heroku, local db string for when the app is in local development) */
const sequelize = new Sequelize(process.env.DATABASE_URL);

// db object will be the container for all the models we define in this directory:
const db = {};

// first properties of the db objects are the sequelize imports:
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Pet = require('./pet')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

db.User.hasOne(db.Pet);
db.Pet.belongsTo(db.User);

// exporting the db object for controllers and app.js to work with:
module.exports = db;