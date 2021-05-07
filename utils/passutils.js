const bcrypt = require('bcryptjs');

const config = require('../config.json');
const saltRounds = config.BCRYPT_SALT_ROUNDS;

/**
 * Returns promises
 */
function pass2hash(password) {
    return bcrypt.hash(password, saltRounds);
}

function compare2hash(password, hash) {
    console.log(password, hash);
    return bcrypt.compare(password, hash);
}

module.exports = {
    pass2hash,
    compare2hash
};