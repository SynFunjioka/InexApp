const bcrypt = require('bcrypt');

require("dotenv").config();

const salts = parseInt(process.env.HASH_SALTS);

/**
 * @param {*} text The text that will be hashed
 * @return string The hashed text
 */
module.exports.Hash = async(text) => {
  console.log('salts', salts);
  return new Promise((resolve, reject) => {

    if(salts === undefined || salts === null) {
      reject({message: 'Mising number of salts', error});
    }
    bcrypt.hash(text, salts, (error, hashedText) => {
      if (error) {
        console.log("Error on hashing", error);
        reject({message: 'The text could not be hashed', error});
      } else {
        resolve(hashedText);
      }
    });
  })
}

module.exports.HashCompare = async(text, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(text, hash).then(match => {
      resolve(match);
    })
    .catch(error => reject(error));
  });
}