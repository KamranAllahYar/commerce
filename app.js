require('dotenv').config();
require('./src/lib/globals');
const express = require('express');
const cors = require('cors');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const routesSetup = require('./src/routes');
const sessionSetup = require('./services/session');
sessionSetup(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
routesSetup(app);

const sequelize = require('./services/database');
sequelize.authenticate().then().catch(console.error);
require('./src/models');
sequelize.sync({ force: true }).then();
module.exports = app;
