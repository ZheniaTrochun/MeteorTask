module.exports = (user) => {
  if (Roles.userIsInRole(user._id, 'blocked')) {
    return 'blocked';
  }

  if (Roles.userIsInRole(user._id, 'admin')) {
    return 'admin';
  }

  if (Roles.userIsInRole(user._id, 'user')) {
    return 'user';
  }

  return '';
}
