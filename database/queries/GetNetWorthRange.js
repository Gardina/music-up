const _ = require('lodash');
const Artist = require('../seeds/artist');
const db = require('./db');

/**
 * Finds the lowest and highest netWorth of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  return new Promise((resolve, reject) => {
    const range = {
      max: _.maxBy(db, a => a.netWorth).netWorth,
      min: _.minBy(db, a => a.netWorth).netWorth,
    };

    resolve(range);
  });
};
