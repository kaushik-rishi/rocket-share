const sourceFile = '../views/sharepage/index.ejs';
const ejs = require('ejs');

(async function() {
	const renderedContent = await ejs.renderFile(sourceFile);
	console.log(renderedContent);
})();
