const express = require('express');
const db = require('./models')
const sequelize = db.sequelize;
const router = require('./routes/routes');
const app = express();
const cors = require('cors');

app.use(cors());
// JSON parser to parse the incoming requests:
app.use(express.json());

// Request headers. Might add a restriction to only accept request from our frontend.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
  next();
});

app.use('/', router);


// we set the port: to environmental variable when deployed; to 8080 when we're local
sequelize.sync({force: true});
const port = process.env.PORT ? process.env.PORT : 8080;

// 🚀🚀🚀
app.listen(port);