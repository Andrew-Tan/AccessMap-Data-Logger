'use strict';

const db = require('../db/index');
const utils = require('./utils');

/**
 * https://localhost:4000/
 * @param   {Object}   req - The request, which nothing is done with
 * @param   {Object}   res - The response that we send the string of "OAuth 2.0 Resource Server"
 * @returns {undefined}
 */
exports.index = (req, res) => {
  res.render('layout', { body: '<h1>OAuth 2.0 Resource Server</h1>' });
};

exports.saveLog = (req, res) => {
  if (req.body == null) {
    return res.json({
      success: false,
      reason: 'Malformed post body',
    });
  }

  db.logData.save(utils.retrieveTokenPayload(req)['sub'], req.body)
  .then((result) => {
    if (result === undefined) {
      return res.json({
        success: false,
        reason: 'Error saving data',
      });
    }
    return res.json({
      success: true,
      logged_content: result,
    });
  })
  .catch(() => {
    res.status(500);
    res.json({ success: false, reason: 'Internal Server Error' });
  });
};
