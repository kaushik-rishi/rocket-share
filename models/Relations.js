const { User } = require('./User');
const { Upload } = require('./Upload');
const { Mail } = require('./Mail');

Upload.belongsTo(User);
User.hasMany(Upload);

Mail.belongsTo(Upload);
Upload.hasMany(Mail);