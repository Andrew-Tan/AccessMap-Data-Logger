'use strict';

// The access tokens.
// You will use these to access your end point data through the means outlined
// in the RFC The OAuth 2.0 Authorization Framework: Bearer Token Usage
// (http://tools.ietf.org/html/rfc6750)

/**
 * Tokens sequelize data structure which stores all the logged data
 */
const models = require('./models');

/**
 * Returns an access token if it finds one, otherwise returns null if one is not found.
 * @param   {String}  token - The token to decode to get the id of the access token to find.
 * @returns {Promise} resolved with the token if found, otherwise resolved with undefined
 */
exports.findAll = async (user_id, auth_provider) => {
  // TODO: Better promise mechanism
  try {
    const result = await models.log_data.findAll({
      where: {
        user_id: user_id,
        auth_provider: auth_provider
      }
    });

    // TODO: check what will return on empty
    if (result === null) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve(undefined);
  }
};

/**
 * Saves a access token, expiration date, user id, client id, and scope. Note: The actual full
 * access token is never saved.  Instead just the ID of the token is saved.  In case of a database
 * breach this prevents anyone from stealing the live tokens.
 * @param   {Object}  token          - The access token (required)
 * @param   {Date}    expirationDate - The expiration of the access token (required)
 * @param   {String}  userID         - The user ID (required)
 * @param   {String}  clientID       - The client ID (required)
 * @param   {String}  scope          - The scope (optional)
 * @returns {Promise} resolved with the saved token
 */
exports.save = async (user_id, auth_provider, data) => {
  try {
    await models.log_data.create({
      user_id: user_id,
      auth_provider: auth_provider,
      logged_content: data
    });
  } catch (error) {
    return Promise.resolve(undefined);
  }

  return Promise.resolve({
    user_id: user_id,
    auth_provider: auth_provider,
    logged_content: data
  });
};

/**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token or undefined if nothing is deleted
 */
exports.delete = async (token) => {
  // TODO: think about who could you this functionality
};

/**
 * Removes all access tokens.
 * @returns {Promise} resolved with all removed tokens returned
 */
exports.removeAll = () => {
  // TODO: is not returning the correct thing.
  return models.log_data.destroy({
    where: {},
  });
};
