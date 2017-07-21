'use strict';

const config         = require('./config');
const path           = require('path');
const site           = require('./routes/site');

// Express configuration
const express        = require('express');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize Session
const model          = require('./db/models').sequelize;
const expressSession = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);

const sequelizeStore = new SequelizeStore({ db: model });
app.use(expressSession({
  saveUninitialized : true,
  resave            : true,
  secret            : config.session.secret,
  store: sequelizeStore,
}));

// Keycloak
const Keycloak = require('keycloak-connect');

const keycloak = new Keycloak({
  store: sequelizeStore,
}, config.client);
app.use(keycloak.middleware());

app.get('/', site.index);
app.put('/api/log', keycloak.protect(), site.saveLog);

// static resources for stylesheets, images, javascript files
app.use(express.static(path.join(__dirname, 'public')));

// Default route handler
app.use((req, res) => {
  res.status(404);
  res.json({
    error: '404 Not Found',
  });
});


console.log('Using HTTP');
app.listen(4060);
console.log('Data Logger started on port 4060');
