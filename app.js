// imports; we need:
// express for streamlining our server
const express = require('express');
// models contains the database models - initialized in ./models/index.js
const db = require('./models')
// from models we want the initialized sequelize object to sync our database
const sequelize = db.sequelize;
// importing the routes file to direct our requests:
const router = require('./routes/routes')
// our server is an express app:
const app = express();

// JSON parser to parse the incoming requests:
app.use(express.json());

// sequelize test
const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
test();


// we set the port: to environmental variable when deployed; to 8080 when we're local
const port = process.env.PORT ? process.env.PORT : 8080;

// 🚀🚀🚀
app.listen(port);