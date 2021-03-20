const { Sequelize } = require('sequelize')

const db = new Sequelize('rocketshare', 'root', 'Kamal_123', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

async function test() {
    db.authenticate()
        .then()
        .catch(console.error)
}

module.exports = db