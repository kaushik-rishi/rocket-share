// fetching with realtions and include testing
// include: ['Upload']
// https://sequelize.org/master/manual/eager-loading.html

require('dotenv').config();
const db = require('./config/db');
const { User } = require('./models/User');
const { Upload } = require('./models/Upload');
require('./models/Relations');

async function createUser() {
	await db.sync({ alter: true });

	let user = await User.create({
		email: 'mamu1@gmail.com',
		name: 'mamu1',
		password: 'Kamal_123'
	});

	console.log(user);
}

// createUser();

async function createUploads() {
	await db.sync({ alter: true });

	Upload.bulkCreate([
		{ id: 'P9m-wOed',originalname: 'banner.png',encoding: '7bit',mimetype: 'image/png',filename: 'P9m-wOed',size: 248131,UserId: 2 },
		{ id: 'P9m-wOee',originalname: 'banner2.png',encoding: '7bit',mimetype: 'image/png',filename: 'P9m-wOee',size: 248131,UserId: 2 }
	]);
}

async function task() {
	let uploads = await Upload.findAll();
	console.log(uploads.length);
}

// createUploads();
// task();

async function fetchWithRelations() {
	let user = await User.findByPk(2, {
		include: Upload
	});

	console.log(user.Uploads[0].originalname);
	console.log(user.Uploads[1].originalname);
}

// fetchWithRelations();