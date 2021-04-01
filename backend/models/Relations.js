const { User } = require('./User');
const { Upload } = require('./Upload');

Upload.belongsTo(User);
User.hasMany(Upload);