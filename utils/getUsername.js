module.exports = (user) => {
  return user.username || (user.profile ? user.profile.name : user.emails[0].address);
};
