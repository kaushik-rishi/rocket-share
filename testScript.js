require('dotenv').config();

// test by fetching the model data
const { Upload } = require('./models/Upload');
const { User } = require('./models/User');

(async function() {
	console.log(await Upload.findByPk('RNex--6y',{
		include: User
	}));
})();

/*
Error study later:
(node:5965) UnhandledPromiseRejectionWarning: SequelizeEagerLoadingError: User is not associated to Upload!
    at Function._getIncludedAssociation (/home/darkangel/WAD-Group-15/node_modules/sequelize/lib/model.js:710:13)
    at Function._validateIncludedElement (/home/darkangel/WAD-Group-15/node_modules/sequelize/lib/model.js:614:53)
    at /home/darkangel/WAD-Group-15/node_modules/sequelize/lib/model.js:509:37
    at Array.map (<anonymous>)
    at Function._validateIncludedElements (/home/darkangel/WAD-Group-15/node_modules/sequelize/lib/model.js:504:39)
    at Function.findAll (/home/darkangel/WAD-Group-15/node_modules/sequelize/lib/model.js:1723:12)
    at async Function.findOne (/home/darkangel/WAD-Group-15/node_modules/sequelize/lib/model.js:1917:12)
    at async Function.findByPk (/home/darkangel/WAD-Group-15/node_modules/sequelize/lib/model.js:1883:12)
    at async /home/darkangel/WAD-Group-15/testScript.js:8:14
(Use `node --trace-warnings ...` to show where the warning was created)
(node:5965) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:5965) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
*/