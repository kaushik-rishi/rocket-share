const ejs = require('ejs');

module.exports = async function(upload) {
	try {
		let str = await ejs.renderFile('./template.ejs', upload);
		return str;
	} catch (err) {
		console.error(err);
		return '';
	}
});