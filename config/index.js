'use strict';

/**
 * Change this value to switch between production or development environment
 *
 * Should be one of the following values:
 * 'test' -> for testing purpose
 * 'production' -> for production purpose
 *
 * NOTE: this also correspond to the name of the presets in database configuration
 */
exports.deployMode = 'test';

/**
 * The client id and the client secret.  I'm using a
 * "trusted" client so that I don't get the "decision"
 * screen.
 */
exports.client = {
  clientID     : 'trustedClient',
  clientSecret : 'ssh-otherpassword',
};

// TODO Compact this more

/**
 * The Authorization server's location, port number, and the token info end point
 */
exports.authorization = {
  host         : 'localhost',
  port         : '3000',
  url          : 'https://localhost:3000/',
  tokenURL     : 'oauth/token',
  authorizeURL : 'https://localhost:3000/dialog/authorize',
  tokeninfoURL : 'https://localhost:3000/api/tokeninfo?access_token=',
  redirectURL  : 'https://localhost:4000/receivetoken',
};

/**
 * Database configuration for access and refresh tokens.
 *
 * timeToCheckExpiredTokens - The time in seconds to check the database
 * for expired access tokens.  For example, if it's set to 3600, then that's
 * one hour to check for expired access tokens.
 * @type {{timeToCheckExpiredTokens: number}}
 */
exports.db = {
  timeToCheckExpiredTokens : 3600,
};

/**
 * Database configuration
 *
 * development - development preset
 * test - test preset
 * production - production preset
 */
exports.database = {
  development: {
    dialect: 'sqlite',
    storage: './userdata.sqlite',
    logging: true,
  },
  // NOTE: DO NOT MODIFY preset "test" as it is used for unit tests. Change "deployMode"
  // to it during unit testing.
  test: {
    dialect: 'sqlite',
    storage: './userdata.sqlite',
    logging: false,
  },
  production: {
    dialect: 'mssql',
    host: 'hidden',
    port: 1433,
    dialectOptions: {
      encrypt: true,
    },
    database: 'hidden',
    username: 'hidden',
    password: 'hidden',
    logging: false,
  },
};

/**
 * Session configuration
 *
 * secret - The session secret that you should change to what you want
 */
exports.session = {
  // TODO You need to change this secret to something that you choose for your secret
  secret: 'A Secret That Should Be Changed',
};
