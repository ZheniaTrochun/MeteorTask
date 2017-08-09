module.exports = (userId) => {
  return !userId || !Roles.userIsInRole(userId, 'admin')
        || Roles.userIsInRole(userId, 'blocked');
};
