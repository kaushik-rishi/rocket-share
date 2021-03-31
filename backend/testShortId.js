require('dotenv').config();

const db = require('./config/db');
const { DataTypes } = require('sequelize');
const { nanoid } = require('nanoid');

const User = db.define('User', {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}, 
	sid: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: nanoid(),
		primaryKey: true
	}
});

async function task() {
	let user = await User.create({
		name: 'Kaushik Rishi'
	});

	console.log(user);
}

db.sync()
	.then(async () => {
		task();
	});

