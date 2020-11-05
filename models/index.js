const User = require('./User');
const ToDo = require('./ToDo');

//create associations
User.hasMany(ToDo, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

module.exports = { User, ToDo };