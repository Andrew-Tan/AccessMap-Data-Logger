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
 * Find all logged data for a user
 * @param   {String}  userID - the user id
 * @returns {Promise} resolved with an array of all the logged data
 */
exports.findAll = async (userID) => {
  try {
    const result = await models.log_data.findAll({
      where: {
        userID,
      }
    });

    if (result.length === 0) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve(undefined);
  }
};

/**
 * Saves a log to the database
 * @param   {String}  userID         - The user ID (required)
 * @param   {String}  data           - The data to log (required)
 * @returns {Promise} resolved with the logged data
 */
exports.save = async (userID, data) => {
  try {
    await models.log_data.create({
      userID,
      data,
    });
  } catch (error) {
    return Promise.resolve(undefined);
  }

  return Promise.resolve({
    userID,
    data,
  });
};

/**
 * Delete
 * @param   {String}  token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token or undefined if nothing is deleted
 */
exports.delete = async (token) => {
  // TODO: think about who could you this functionality
};

/**
 * Removes all
 * @returns {Promise} resolved with all removed tokens returned
 */
exports.removeAll = () => {
  // TODO: is not returning the correct thing.
  return models.log_data.destroy({
    where: {},
  });
};
