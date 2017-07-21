'use strict';

const jwt = require('jsonwebtoken');
/* eslint-disable camelcase */

exports.retrieveTokenPayload = (req) => {
  return jwt.decode(JSON.parse(req.session['keycloak-token'])['access_token']);
};
